import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "@/lib/db";
import { createSession, SESSION_COOKIE } from "@/lib/auth";
import { Phone } from "lucide-react";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone, address, locality } = body;


        if (!name || !email || !password || !phone || !address || !locality) {
            return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "La contraseña debe tener al menos 6 caracteres." },
                { status: 400 }
            );
        }

        const [existing] = await db.query<RowDataPacket[]>(
            `SELECT email FROM users WHERE email = ?`,
            [email]
        );
        if (existing.length > 0) {
            return NextResponse.json({ success: false, error: "Ese email ya está registrado." }, { status: 409 });
        }

        const [exist] = await db.query<RowDataPacket[]>(
            `SELECT phone FROM users WHERE phone = ?`,
            [phone]
        );
        if (exist.length > 0) {
            return NextResponse.json({ success: false, error: "Ese Número ya está registrado." }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const [result] = await db.query<ResultSetHeader>('INSERT INTO users( full_name, email, password_hash, phone, address, locality) VALUES ( ?, ?, ?, ?, ?, ?)',
            [name, email, passwordHash, phone, address, locality]);

        const token = await createSession({
            userId: result.insertId,
            email
        });

        const response = NextResponse.json(
            { success: true, user: { id: result.insertId, name, email, locality } },
            { status: 201 }
        );
        response.cookies.set(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return response;
    } catch (error) {
        console.log('A ocurrido un error: ', error)
        return NextResponse.json({ success: false, message: error }, { status: 500 })
    }
}