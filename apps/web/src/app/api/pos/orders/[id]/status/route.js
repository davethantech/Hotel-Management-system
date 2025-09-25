import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = ["preparing", "ready", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update order status
    const [updatedOrder] = await sql`
      UPDATE pos_orders 
      SET order_status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedOrder) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    return Response.json({ error: "Failed to update order status" }, { status: 500 });
  }
}