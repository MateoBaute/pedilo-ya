import {NextResponse} from "next/server";
import db from "@/lib/db";
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM locations");
        return NextResponse.json({success: true, list: rows }, {status: 200});
    }catch(error){
        return NextResponse.json({ error: "Failed to fetch locations", err: error }, { status: 500 });
    }
}
