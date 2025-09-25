import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current date ranges
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    // Get total orders
    const [totalOrdersResult] = await sql`
      SELECT COUNT(*) as total_orders FROM pos_orders
    `;

    const [todayOrdersResult] = await sql`
      SELECT COUNT(*) as today_orders FROM pos_orders 
      WHERE created_at >= ${startOfToday.toISOString()}
    `;

    const [yesterdayOrdersResult] = await sql`
      SELECT COUNT(*) as yesterday_orders FROM pos_orders 
      WHERE created_at >= ${startOfYesterday.toISOString()} 
      AND created_at < ${startOfToday.toISOString()}
    `;

    // Get pending orders
    const [pendingOrdersResult] = await sql`
      SELECT COUNT(*) as pending_orders FROM pos_orders 
      WHERE order_status IN ('preparing', 'ready')
    `;

    // Get completed orders
    const [completedOrdersResult] = await sql`
      SELECT COUNT(*) as completed_orders FROM pos_orders 
      WHERE order_status = 'completed'
    `;

    const [todayCompletedResult] = await sql`
      SELECT COUNT(*) as today_completed FROM pos_orders 
      WHERE order_status = 'completed' 
      AND created_at >= ${startOfToday.toISOString()}
    `;

    const [yesterdayCompletedResult] = await sql`
      SELECT COUNT(*) as yesterday_completed FROM pos_orders 
      WHERE order_status = 'completed' 
      AND created_at >= ${startOfYesterday.toISOString()} 
      AND created_at < ${startOfToday.toISOString()}
    `;

    // Get revenue
    const [totalRevenueResult] = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM pos_orders 
      WHERE payment_status = 'paid'
    `;

    const [todayRevenueResult] = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as today_revenue FROM pos_orders 
      WHERE payment_status = 'paid' 
      AND created_at >= ${startOfToday.toISOString()}
    `;

    const [yesterdayRevenueResult] = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as yesterday_revenue FROM pos_orders 
      WHERE payment_status = 'paid' 
      AND created_at >= ${startOfYesterday.toISOString()} 
      AND created_at < ${startOfToday.toISOString()}
    `;

    // Calculate growth percentages
    const calculateGrowth = (today, yesterday) => {
      if (yesterday === 0) return today > 0 ? 100 : 0;
      return Math.round(((today - yesterday) / yesterday) * 100);
    };

    const totalOrders = parseInt(totalOrdersResult.total_orders);
    const todayOrders = parseInt(todayOrdersResult.today_orders);
    const yesterdayOrders = parseInt(yesterdayOrdersResult.yesterday_orders);
    const ordersGrowth = calculateGrowth(todayOrders, yesterdayOrders);

    const pendingOrders = parseInt(pendingOrdersResult.pending_orders);

    const completedOrders = parseInt(completedOrdersResult.completed_orders);
    const todayCompleted = parseInt(todayCompletedResult.today_completed);
    const yesterdayCompleted = parseInt(
      yesterdayCompletedResult.yesterday_completed,
    );
    const completedGrowth = calculateGrowth(todayCompleted, yesterdayCompleted);

    const totalRevenue = parseFloat(totalRevenueResult.total_revenue);
    const todayRevenue = parseFloat(todayRevenueResult.today_revenue);
    const yesterdayRevenue = parseFloat(
      yesterdayRevenueResult.yesterday_revenue,
    );
    const revenueGrowth = calculateGrowth(todayRevenue, yesterdayRevenue);

    const stats = {
      totalOrders: totalOrders,
      pendingOrders: pendingOrders,
      completedOrders: completedOrders,
      totalRevenue: totalRevenue.toFixed(2),
      // Growth percentages for display
      ordersChange:
        ordersGrowth >= 0 ? `+${ordersGrowth}%` : `${ordersGrowth}%`,
      pendingChange: "+0%", // No growth calculation for pending
      completedChange:
        completedGrowth >= 0 ? `+${completedGrowth}%` : `${completedGrowth}%`,
      revenueChange:
        revenueGrowth >= 0 ? `+${revenueGrowth}%` : `${revenueGrowth}%`,
    };

    return Response.json(stats);
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return Response.json(
      { error: "Failed to fetch order stats" },
      { status: 500 },
    );
  }
}
