import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "@/lib/db";
import { createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, name, email, password, description, address, location } = body;

    if (role !== "store") {
      return NextResponse.json(
        { error: "El registro para ese tipo de cuenta todavía no está disponible." },
        { status: 400 }
      );
    }

    if (!name || !email || !password || !description || !address || !location) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    const [existing] = await db.query<RowDataPacket[]>(
      `SELECT email FROM stores WHERE email = ?`,
      [email]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: "Ese email ya está registrado." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO stores (name, description, address, location, email, password_hash)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, address, location, email, passwordHash]
    );

    const token = await createSession({
      userId: result.insertId,
      email,
      rol: "negocio",
    });

    const response = NextResponse.json({ success: true }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Ese email ya está registrado." }, { status: 409 });
    }
    return NextResponse.json(
      { error: "No se pudo crear la cuenta.", err: String(error) },
      { status: 500 }
    );
  }
}
