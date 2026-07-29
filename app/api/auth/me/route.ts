import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  const session = await verifySession(token);

  if (!session) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  return NextResponse.json({ loggedIn: true, session }, { status: 200 });
}