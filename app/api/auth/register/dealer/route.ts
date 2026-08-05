import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "@/lib/db";
import { createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password, phone, locality } = body;

    if (!name || !email || !password || !phone || !locality) {
        return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
    }

    if (password.length < 6) {
        return NextResponse.json(
            { error: "La contraseña debe tener al menos 6 caracteres." },
            { status: 400 }
        );
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [existing] = await connection.query<RowDataPacket[]>(
            `SELECT email, phone FROM dealers WHERE email = ? OR phone = ?`,
            [email, phone]
        );
        if (existing.length > 0) {
            await connection.rollback();
            const conflict = existing[0].email === email ? "email" : "número";
            return NextResponse.json(
                { success: false, error: `Ese ${conflict} ya está registrado.` },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await connection.query<ResultSetHeader>(
            'INSERT INTO dealers(name, email, phone, password_hash, locality) VALUES (?, ?, ?, ?, ?)',
            [name, email, String(phone), passwordHash, locality]
        );

        const token = await createSession({
            userId: result.insertId,
            email,
            type: 'dealer'
        });

        await connection.commit();

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
        await connection.rollback();
        console.log('A ocurrido un error: ', error);

        if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
            const sqlMessage = "sqlMessage" in error && typeof error.sqlMessage === "string"
                ? error.sqlMessage
                : "";

            if (sqlMessage.includes("email")) {
                return NextResponse.json({ success: false, error: "Ese Email ya está registrado." }, { status: 409 });
            }
            if (sqlMessage.includes("phone")) {
                return NextResponse.json({ success: false, error: "Ese Número ya está registrado." }, { status: 409 });
            }
            if (sqlMessage.includes("name")) {
                return NextResponse.json({ success: false, error: "Ese Nombre ya está registrado." }, { status: 409 });
            }

            return NextResponse.json({ success: false, error: "Alguno de los campos ya está registrado o a ocurrido un probela en el servidor." }, { status: 409 });
        }

        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}