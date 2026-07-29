"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PAGE_BG = "linear-gradient(160deg, #0f0906 0%, #1e1408 35%, #150d07 65%, #0a0603 100%)";

const glassCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  boxShadow: "0 28px 72px rgba(0, 0, 0, 0.55)",
  borderRadius: 28,
  padding: "44px 40px",
  width: "100%",
  maxWidth: 420,
  position: "relative",
};

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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("store");
  const [password, setPassword] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      mail: email,
      rol:role,
      pass:password
    }
    console.log(data)
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, role, password }),
    //   })
    //   const data = await response.json();
    // } catch (error) {
    //   console.error("Error logging in:", error);
    // }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: PAGE_BG,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 16px", position: "relative",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "25%", left: "35%",
        width: 600, height: 600, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(198,61,47,0.1) 0%, transparent 65%)",
      }} />

      <div style={glassCard}>
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,193,69,0.5), transparent)",
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
          Ingresá a tu cuenta
        </h1>
        <p style={{ fontSize: 14, color: "rgba(251,243,230,0.5)", marginBottom: 34 }}>
          ¿No tenés cuenta?{" "}
          <Link href="/register" style={{
            color: "#FFC145", fontWeight: 600,
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>
            Registrate acá
          </Link>
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
            <label style={fieldLabel}>Rol</label>
            <div ref={roleRef} style={{ position: 'relative' }}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={roleOpen}
                onClick={() => setRoleOpen(open => !open)}
                style={{
                  ...fieldInput,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  width: '100%',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                <span style={{ color: '#FBF3E6', fontWeight: 500 }}>
                  {role === 'store' ? 'Negocio' : role === 'dealer' ? 'Repartidor' : 'Cliente'}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(251,243,230,0.45)' }}>
                  ▼
                </span>
              </button>

              {roleOpen && (
                <ul
                  role="listbox"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    background: 'rgba(20, 16, 12, 0.96)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 16,
                    padding: 8,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                    zIndex: 10,
                  }}
                >
                  {[
                    { label: 'Negocio', value: 'store' },
                    { label: 'Repartidor', value: 'dealer' },
                    { label: 'Cliente', value: 'user' },
                  ].map(option => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={role === option.value}
                      onClick={() => {
                        setRole(option.value);
                        setRoleOpen(false);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        color: role === option.value ? '#FFC145' : '#FBF3E6',
                        background: role === option.value ? 'rgba(255,193,69,0.14)' : 'transparent',
                        fontWeight: 600,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => {
                        if (role !== option.value) {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (role !== option.value) {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label style={fieldLabel}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="········"
              required
              autoComplete="current-password"
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
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
