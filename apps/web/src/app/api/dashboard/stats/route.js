import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get dashboard statistics
    const [
      todayBookingsResult,
      totalCustomersResult,
      todayRevenueResult,
      occupancyResult,
      recentBookingsResult
    ] = await sql.transaction([
      // Today's bookings count
      sql`
        SELECT COUNT(*) as count 
        FROM bookings 
        WHERE DATE(created_at) = ${today}
      `,
      
      // Total customers count
      sql`
        SELECT COUNT(*) as count 
        FROM customers
      `,
      
      // Today's revenue
      sql`
        SELECT COALESCE(SUM(total_amount), 0) as revenue
        FROM bookings 
        WHERE DATE(created_at) = ${today} 
        AND payment_status = 'paid'
      `,
      
      // Occupancy rate (simplified calculation)
      sql`
        SELECT 
          (SELECT COUNT(*) FROM rooms WHERE room_status = 'occupied') * 100.0 / 
          (SELECT COUNT(*) FROM rooms WHERE is_active = true) as occupancy_rate
      `,
      
      // Recent bookings with customer and room details
      sql`
        SELECT 
          b.booking_id,
          b.total_amount,
          b.booking_status,
          b.created_at,
          c.first_name || ' ' || c.last_name as customer_name,
          r.room_number
        FROM bookings b
        LEFT JOIN customers c ON b.customer_id = c.id
        LEFT JOIN rooms r ON b.room_id = r.id
        ORDER BY b.created_at DESC
        LIMIT 5
      `
    ]);

    const stats = {
      todayBookings: parseInt(todayBookingsResult[0]?.count || 0),
      totalCustomers: parseInt(totalCustomersResult[0]?.count || 0),
      totalAmount: parseFloat(todayRevenueResult[0]?.revenue || 0),
      occupancyRate: Math.round(parseFloat(occupancyResult[0]?.occupancy_rate || 0)),
      recentBookings: recentBookingsResult || []
    };

    return Response.json(stats);
    
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return Response.json(
      { error: 'Failed to fetch dashboard statistics' }, 
      { status: 500 }
    );
  }
}