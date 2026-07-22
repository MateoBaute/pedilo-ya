import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req:Request){
    try{
        const { location } = await req.json();

        const [rows] = await db.query("SELECT * FROM products WHERE location = ?", [location]);
        return NextResponse.json({success: true, list: rows }, {status: 200});
    }catch(error){
        return NextResponse.json({ error: "Failed to fetch products", err: error }, { status: 500 });
    }
}