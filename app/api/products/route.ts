import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }

    const [rows] = await db.query(
      `SELECT
        p.id,
        p.name,
        p.description,
        p.category,
        p.price,
        p.location,
        p.image_url,
        p.stores_id,
        s.name AS shopName
      FROM products p
      INNER JOIN stores s ON p.stores_id = s.id
      WHERE p.location = ?`,
      [location]
    );

    return NextResponse.json({ success: true, list: rows }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products and stores", err: error },
      { status: 500 }
    );
  }
}
