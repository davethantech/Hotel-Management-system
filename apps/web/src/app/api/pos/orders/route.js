import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const orderType = searchParams.get("orderType") || "";
    const paymentStatus = searchParams.get("paymentStatus") || "";
    const dateRange = searchParams.get("dateRange") || "";

    let query = `
      SELECT 
        o.*,
        COUNT(oi.id) as item_count,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', oi.id,
              'menu_item_id', oi.menu_item_id,
              'quantity', oi.quantity,
              'unit_price', oi.unit_price,
              'total_price', oi.total_price,
              'special_instructions', oi.special_instructions,
              'item_name', mi.item_name
            )
          ) FILTER (WHERE oi.id IS NOT NULL), 
          '[]'::json
        ) as items
      FROM pos_orders o
      LEFT JOIN pos_order_items oi ON o.id = oi.order_id
      LEFT JOIN pos_menu_items mi ON oi.menu_item_id = mi.id
      WHERE 1=1
    `;

    const params = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (LOWER(o.order_number) LIKE LOWER($${paramCount}) OR LOWER(o.customer_name) LIKE LOWER($${paramCount}))`;
      params.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      query += ` AND o.order_status = $${paramCount}`;
      params.push(status);
    }

    if (orderType) {
      paramCount++;
      query += ` AND o.order_type = $${paramCount}`;
      params.push(orderType);
    }

    if (paymentStatus) {
      paramCount++;
      query += ` AND o.payment_status = $${paramCount}`;
      params.push(paymentStatus);
    }

    if (dateRange) {
      const today = new Date();
      let startDate;
      
      switch (dateRange) {
        case "today":
          startDate = new Date(today.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(today.setDate(today.getDate() - 7));
          break;
        case "month":
          startDate = new Date(today.setMonth(today.getMonth() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        paramCount++;
        query += ` AND o.created_at >= $${paramCount}`;
        params.push(startDate.toISOString());
      }
    }

    query += `
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT 100
    `;

    const orders = await sql(query, params);

    return Response.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      customer_name,
      order_type = "dine_in",
      table_number,
      items = [],
      notes,
      booking_id
    } = body;

    if (!customer_name || items.length === 0) {
      return Response.json({ error: "Customer name and items are required" }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.unit_price * item.quantity;
    }

    const tax_amount = subtotal * 0.1; // 10% tax
    const total_amount = subtotal + tax_amount;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    // Create order
    const [order] = await sql`
      INSERT INTO pos_orders (
        order_number, customer_name, order_type, table_number,
        subtotal, tax_amount, total_amount, notes, booking_id,
        created_by
      ) VALUES (
        ${orderNumber}, ${customer_name}, ${order_type}, ${table_number},
        ${subtotal}, ${tax_amount}, ${total_amount}, ${notes}, ${booking_id},
        ${session.user.id}
      ) RETURNING *
    `;

    // Create order items
    for (const item of items) {
      await sql`
        INSERT INTO pos_order_items (
          order_id, menu_item_id, quantity, unit_price, total_price, special_instructions
        ) VALUES (
          ${order.id}, ${item.menu_item_id}, ${item.quantity}, 
          ${item.unit_price}, ${item.unit_price * item.quantity}, ${item.special_instructions}
        )
      `;
    }

    return Response.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}