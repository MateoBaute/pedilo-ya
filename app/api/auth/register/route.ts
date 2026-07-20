import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, nombre, rol, rut_cedula, telefono } = body;

  if (!email || !password || !nombre || !rol) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nombre, rol },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  if (!authData.user) {
    return NextResponse.json(
      { error: "No se pudo crear el usuario" },
      { status: 500 }
    );
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: authData.user.id,
    nombre,
    ...(telefono ? { telefono } : {}),
  });

  if (profileError && profileError.code !== "23505") {
    return NextResponse.json(
      { error: "Error al crear el perfil" },
      { status: 500 }
    );
  }

  if (rol === "negocio") {
    const { error: negocioError } = await admin.from("negocios").insert({
      usuario_id: authData.user.id,
      nombre,
      ...(rut_cedula ? { rut_cedula } : {}),
      verificado: false,
    });

    if (negocioError) {
      return NextResponse.json(
        { error: "Error al crear el negocio" },
        { status: 500 }
      );
    }
  }

  if (rol === "repartidor") {
    const { error: repartidorError } = await admin
      .from("repartidores")
      .insert({ usuario_id: authData.user.id });

    if (repartidorError) {
      return NextResponse.json(
        { error: "Error al crear el perfil de repartidor" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
