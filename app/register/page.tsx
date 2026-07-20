"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, User, Bike } from "lucide-react";

type Rol = "cliente" | "negocio" | "repartidor";

const roles = [
  {
    id: "cliente" as Rol,
    icon: User,
    label: "Cliente",
    desc: "Quiero hacer pedidos",
  },
  {
    id: "negocio" as Rol,
    icon: ShoppingBag,
    label: "Negocio",
    desc: "Quiero vender mis productos",
  },
  {
    id: "repartidor" as Rol,
    icon: Bike,
    label: "Repartidor",
    desc: "Quiero hacer entregas",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [rol, setRol] = useState<Rol>("cliente");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rutCedula, setRutCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nombre, rol, rut_cedula: rutCedula, telefono }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Error al registrarse");
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <Link href="/" className="auth-logo">
          Pedilo<span className="logo-accent">Ya</span>
        </Link>

        <h1 className="auth-title">Creá tu cuenta</h1>
        <p className="auth-sub">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="auth-link">
            Ingresá acá
          </Link>
        </p>

        <div className="rol-selector">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`rol-card${rol === r.id ? " rol-card--active" : ""}`}
              onClick={() => setRol(r.id)}
            >
              <r.icon size={22} />
              <span className="rol-card-label">{r.label}</span>
              <span className="rol-card-desc">{r.desc}</span>
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="nombre">
              {rol === "negocio" ? "Nombre del negocio" : "Tu nombre"}
            </label>
            <input
              id="nombre"
              type="text"
              className="field-input"
              placeholder={rol === "negocio" ? "Ej: Almacén Don Pedro" : "Ej: Juan García"}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {rol === "negocio" && (
            <div className="field">
              <label className="field-label" htmlFor="rut">
                RUT o cédula del titular
              </label>
              <input
                id="rut"
                type="text"
                className="field-input"
                placeholder="Ej: 21234567-8"
                value={rutCedula}
                onChange={(e) => setRutCedula(e.target.value)}
              />
            </div>
          )}

          {rol === "repartidor" && (
            <div className="field">
              <label className="field-label" htmlFor="telefono">
                Teléfono de contacto
              </label>
              <input
                id="telefono"
                type="tel"
                className="field-input"
                placeholder="Ej: 099 123 456"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          )}

          <div className="field">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field-input"
              placeholder="vos@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="field-input"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
