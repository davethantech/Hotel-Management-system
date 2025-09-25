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

    // Get room types with room counts
    const roomTypes = await sql`
      SELECT 
        rt.*,
        COUNT(r.id) as room_count,
        COUNT(CASE WHEN r.room_status = 'available' THEN 1 END) as available_rooms
      FROM room_types rt
      LEFT JOIN rooms r ON rt.id = r.room_type_id AND r.is_active = true
      WHERE rt.is_active = true
      GROUP BY rt.id
      ORDER BY rt.type_name
    `;

    return Response.json(roomTypes);
  } catch (error) {
    console.error('Error fetching room types:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch room types' }), {
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
    const { type_name, description, base_price, max_occupancy, amenities, images } = body;

    // Validate required fields
    if (!type_name || !description || !base_price || !max_occupancy) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert room type
    const roomType = await sql`
      INSERT INTO room_types (type_name, description, base_price, max_occupancy, amenities, images)
      VALUES (${type_name}, ${description}, ${base_price}, ${max_occupancy}, ${JSON.stringify(amenities || [])}, ${JSON.stringify(images || [])})
      RETURNING *
    `;

    return Response.json(roomType[0]);
  } catch (error) {
    console.error('Error creating room type:', error);
    return new Response(JSON.stringify({ error: 'Failed to create room type' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}