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

    // Get category statistics
    const [categoryStats, menuItemStats] = await sql.transaction([
      // Category statistics
      sql`
        SELECT 
          COUNT(*) as total_categories,
          COUNT(CASE WHEN is_active = true THEN 1 END) as active_categories,
          COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_categories
        FROM pos_categories
      `,
      
      // Menu item statistics
      sql`
        SELECT COUNT(*) as total_menu_items
        FROM pos_menu_items
      `
    ]);

    const stats = {
      totalCategories: parseInt(categoryStats[0].total_categories),
      activeCategories: parseInt(categoryStats[0].active_categories),
      inactiveCategories: parseInt(categoryStats[0].inactive_categories),
      totalMenuItems: parseInt(menuItemStats[0].total_menu_items)
    };

    return Response.json(stats);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch category statistics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}