import { NextResponse } from 'next/server'
import bycrypt from 'bcryptjs'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body
    const passwordHash = await bycrypt.hash(password, 10)
    const [user] = await db.query(
      'SELECT id, name, email, role, description, address, location FROM users WHERE email = ? AND password_hash = ?;',
      [email, passwordHash]
    )
    return NextResponse.json({ success: true, user: user }, { status: 200 });
  }catch(error){
    return NextResponse.json({ error: "Error al iniciar sesión." }, { status: 500 });
  }
}
