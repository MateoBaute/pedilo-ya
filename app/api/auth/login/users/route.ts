import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'
import { createSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Debes rellenar todos los campos' }, { status: 400 })
    }

    const [rows] = await db.query(
      'SELECT id, full_name AS name, email, password_hash FROM users WHERE email = ?;',
      [email]
    )

    const user = Array.isArray(rows) ? rows[0] : undefined
    if (!user) {
      return NextResponse.json({ success: false, message: 'Credenciales inválidas' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, (user as any).password_hash)
    if (!match) {
      return NextResponse.json({ success: false, message: 'Credenciales inválidas' }, { status: 401 })
    }

    const { password_hash, ...safeUser } = user as any

    const token = await createSession({
      userId: safeUser.id,
      email: safeUser.email
    })

    const response = NextResponse.json({ success: true, user: safeUser }, { status: 200 })
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al iniciar sesión.' }, { status: 500 })
  }
}
