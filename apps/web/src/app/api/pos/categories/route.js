import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const isActive = url.searchParams.get('is_active');
    const limit = parseInt(url.searchParams.get('limit')) || 50;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    let query = `
      SELECT 
        pc.*,
        COUNT(pmi.id) as item_count
      FROM pos_categories pc
      LEFT JOIN pos_menu_items pmi ON pc.id = pmi.category_id
      WHERE 1=1
    `;

    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (
        LOWER(pc.category_name) LIKE LOWER($${paramIndex}) OR 
        LOWER(pc.description) LIKE LOWER($${paramIndex})
      )`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (isActive !== null && isActive !== undefined) {
      query += ` AND pc.is_active = $${paramIndex}`;
      params.push(isActive === 'true');
      paramIndex++;
    }

    query += `
      GROUP BY pc.id
      ORDER BY pc.display_order, pc.category_name
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(limit, offset);

    const categories = await sql(query, params);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM pos_categories pc WHERE 1=1`;
    const countParams = [];
    let countParamIndex = 1;

    if (search) {
      countQuery += ` AND (
        LOWER(pc.category_name) LIKE LOWER($${countParamIndex}) OR 
        LOWER(pc.description) LIKE LOWER($${countParamIndex})
      )`;
      countParams.push(`%${search}%`);
      countParamIndex++;
    }

    if (isActive !== null && isActive !== undefined) {
      countQuery += ` AND pc.is_active = $${countParamIndex}`;
      countParams.push(isActive === 'true');
      countParamIndex++;
    }

    const totalResult = await sql(countQuery, countParams);
    const total = parseInt(totalResult[0].total);

    return Response.json({
      categories,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { category_name, description, display_order } = body;

    // Validate required fields
    if (!category_name) {
      return new Response(JSON.stringify({ error: 'Category name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if category name already exists
    const existingCategory = await sql`
      SELECT id FROM pos_categories WHERE LOWER(category_name) = LOWER(${category_name})
    `;

    if (existingCategory.length > 0) {
      return new Response(JSON.stringify({ error: 'Category name already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If no display_order provided, set it to the next available order
    let finalDisplayOrder = display_order;
    if (finalDisplayOrder === undefined || finalDisplayOrder === null) {
      const maxOrderResult = await sql`
        SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM pos_categories
      `;
      finalDisplayOrder = maxOrderResult[0].next_order;
    }

    // Create category
    const category = await sql`
      INSERT INTO pos_categories (category_name, description, display_order)
      VALUES (${category_name}, ${description}, ${finalDisplayOrder})
      RETURNING *
    `;

    return Response.json(category[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(JSON.stringify({ error: 'Failed to create category' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}