"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, User, Bike } from "lucide-react";

type Rol = "cliente" | "negocio" | "repartidor";

const ROLES = [
  { id: "cliente" as Rol,      icon: User,        label: "Cliente",      desc: "Quiero hacer pedidos" },
  { id: "negocio" as Rol,      icon: ShoppingBag, label: "Negocio",      desc: "Quiero vender" },
  { id: "repartidor" as Rol,   icon: Bike,        label: "Repartidor",   desc: "Quiero repartir" },
];

const PAGE_BG = "linear-gradient(160deg, #0f0906 0%, #1e1408 35%, #150d07 65%, #0a0603 100%)";

const fieldLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 600,
  color: "rgba(251,243,230,0.45)",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  display: "block", marginBottom: 7,
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.13)",
  borderRadius: 12, padding: "12px 14px",
  fontSize: 15, fontWeight: 500, color: "#FBF3E6",
  outline: "none", transition: "border-color 0.15s",
};

export default function RegisterPage() {
  const router = useRouter();
  const [rol, setRol] = useState<Rol>("cliente");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rutCedula, setRutCedula] = useState("");
  const [telefono, setTelefono] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/login");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: PAGE_BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 16px", position: "relative",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "20%", right: "25%",
        width: 600, height: 600, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(255,193,69,0.07) 0%, transparent 65%)",
      }} />

      <div style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 28px 72px rgba(0,0,0,0.55)",
        borderRadius: 28, padding: "44px 40px",
        width: "100%", maxWidth: 520,
        position: "relative",
      }}>
        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(198,61,47,0.5), transparent)",
        }} />

        <Link href="/" style={{
          display: "inline-block",
          fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800,
          color: "#C63D2F", marginBottom: 30,
        }}>
          Pedilo<span style={{ color: "#FFC145" }}>Ya</span>
        </Link>

        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
          color: "#FBF3E6", letterSpacing: "-0.02em", marginBottom: 8,
        }}>
          Creá tu cuenta
        </h1>
        <p style={{ fontSize: 14, color: "rgba(251,243,230,0.5)", marginBottom: 30 }}>
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" style={{
            color: "#FFC145", fontWeight: 600,
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>
            Ingresá acá
          </Link>
        </p>

        {/* Role selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
          {ROLES.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRol(r.id)}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 5,
                padding: "14px 8px",
                border: rol === r.id
                  ? "1px solid rgba(255,193,69,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                background: rol === r.id ? "rgba(255,193,69,0.1)" : "rgba(255,255,255,0.05)",
                boxShadow: rol === r.id ? "0 0 0 1px rgba(255,193,69,0.3)" : "none",
                cursor: "pointer", transition: "all 0.15s",
                color: rol === r.id ? "#FFC145" : "rgba(251,243,230,0.55)",
              }}
            >
              <r.icon size={20} />
              <span style={{
                fontSize: 13, fontWeight: 700,
                fontFamily: "var(--font-display)",
                color: rol === r.id ? "#FFC145" : "rgba(251,243,230,0.8)",
              }}>
                {r.label}
              </span>
              <span style={{ fontSize: 11, color: "rgba(251,243,230,0.4)", textAlign: "center" }}>
                {r.desc}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={fieldLabel}>
              {rol === "negocio" ? "Nombre del negocio" : "Tu nombre"}
            </label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder={rol === "negocio" ? "Ej: Almacén Don Pedro" : "Ej: Juan García"}
              required
              style={fieldInput}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,193,69,0.55)"}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.13)"}
            />
          </div>

          {rol === "negocio" && (
            <div>
              <label style={fieldLabel}>RUT o cédula del titular</label>
              <input
                type="text"
                value={rutCedula}
                onChange={e => setRutCedula(e.target.value)}
                placeholder="Ej: 21234567-8"
                style={fieldInput}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,193,69,0.55)"}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.13)"}
              />
            </div>
          )}

          {rol === "repartidor" && (
            <div>
              <label style={fieldLabel}>Teléfono de contacto</label>
              <input
                type="tel"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="Ej: 099 123 456"
                style={fieldInput}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,193,69,0.55)"}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.13)"}
              />
            </div>
          )}

          <div>
            <label style={fieldLabel}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vos@ejemplo.com"
              required
              autoComplete="email"
              style={fieldInput}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,193,69,0.55)"}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.13)"}
            />
          </div>

          <div>
            <label style={fieldLabel}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              autoComplete="new-password"
              style={fieldInput}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,193,69,0.55)"}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.13)"}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: 4,
              background: "linear-gradient(135deg, #C63D2F, #9e2a1e)",
              color: "#FBF3E6", fontWeight: 700, fontSize: 15,
              padding: "14px", borderRadius: 14, border: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(198,61,47,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(198,61,47,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(198,61,47,0.4)";
            }}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
