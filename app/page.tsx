"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Utensils, ShoppingBag, Pill, Croissant,
  Beer, Wrench, Gift, ChevronDown, MapPin,
} from "lucide-react";

// ── Shared style tokens ──────────────────────────────────────────────────────
const BG = "linear-gradient(160deg, #0f0906 0%, #1e1408 35%, #150d07 65%, #0a0603 100%)";

const glass = (opacity = 0.06): React.CSSProperties => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.11)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
});

const glassStrong: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.16)",
  boxShadow: "0 12px 48px rgba(0, 0, 0, 0.45)",
};

const locationsBack: React.CSSProperties = {
  background: "rgba(56, 42, 30, 0.92)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 12px 48px rgba(0, 0, 0, 0.45)",
};

const eyebrow = (color: string, bg: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: bg,
  border: `1px solid ${color}40`,
  borderRadius: 999,
  padding: "6px 14px",
  marginBottom: 18,
  fontSize: 11,
  fontWeight: 600,
  color,
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { icon: Utensils,   label: "Comida" },
  { icon: ShoppingBag, label: "Almacén" },
  { icon: Pill,       label: "Farmacia" },
  { icon: Croissant,  label: "Panadería" },
  { icon: Beer,       label: "Bebidas" },
  { icon: Wrench,     label: "Ferretería" },
  { icon: Gift,       label: "Regalos" },
];

const LOCATIONS = [
  "Mercedes, Soriano",
  "Dolores, Soriano",
  "Fray Bentos, Río Negro",
  "Young, Río Negro",
  "Trinidad, Flores",
];

const STEPS = [
  {
    num: "01",
    title: "Elegí tu zona",
    body: "Seleccioná tu ciudad y vas a ver solo lo que realmente te pueden entregar ahí, sin sorpresas de cobertura.",
    accent: "#C63D2F",
  },
  {
    num: "02",
    title: "Armá tu pedido",
    body: "Elegís el producto, ves el precio real con el envío incluido, y pagás con Mercado Pago desde la app.",
    accent: "#F2762E",
  },
  {
    num: "03",
    title: "Lo recibís rapidito",
    body: "Un repartidor de tu zona lo levanta y te lo lleva. Seguís el pedido en tiempo real hasta que golpea la puerta.",
    accent: "#FFC145",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function hoverIn(e: React.MouseEvent, styles: Partial<CSSStyleDeclaration>) {
    Object.assign((e.currentTarget as HTMLElement).style, styles);
  }
  function hoverOut(e: React.MouseEvent, styles: Partial<CSSStyleDeclaration>) {
    Object.assign((e.currentTarget as HTMLElement).style, styles);
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#FBF3E6", overflowX: "hidden" }}>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        ...glass(0.07),
        borderTop: "none", borderLeft: "none", borderRight: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto", padding: "0 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64,
        }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800,
            color: "#C63D2F", letterSpacing: "-0.02em",
          }}>
            Pedilo<span style={{ color: "#FFC145" }}>Ya</span>
          </div>

          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {[
              ["Cómo funciona", "#como-funciona"],
              ["Negocios", "#negocios"],
              ["Repartidores", "#repartidores"],
              ["Ayuda", "#ayuda"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{ fontSize: 14, fontWeight: 600, color: "rgba(251,243,230,0.65)", transition: "color 0.15s" }}
                onMouseEnter={e => hoverIn(e, { color: "#FFC145" })}
                onMouseLeave={e => hoverOut(e, { color: "rgba(251,243,230,0.65)" })}
              >
                {label}
              </a>
            ))}
          </nav>

          <Link
            href="/login"
            style={{
              background: "rgba(255,193,69,0.12)", color: "#FFC145",
              border: "1px solid rgba(255,193,69,0.35)", borderRadius: 999,
              padding: "9px 22px", fontSize: 14, fontWeight: 700,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => hoverIn(e, { background: "#FFC145", color: "#2B1A0A" })}
            onMouseLeave={e => hoverOut(e, { background: "rgba(255,193,69,0.12)", color: "#FFC145" })}
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 56px", position: "relative", zIndex: 2 }}>
        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: "5%", left: "0%",
          width: 600, height: 600, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(198,61,47,0.13) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", top: "15%", right: "5%",
          width: 500, height: 500, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,193,69,0.08) 0%, transparent 65%)",
        }} />

        <div
          className="hero-grid"
          style={{
            maxWidth: 1180, margin: "0 auto", padding: "0 28px",
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
            gap: 48, alignItems: "center", position: "relative",
          }}
        >
          {/* Left */}
          <div className="fade-up">
            <div style={eyebrow("#6DD481", "rgba(76,154,91,0.14)")}>
              <span className="pulse" />
              Hecho para el interior
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 5.5vw, 66px)",
              fontWeight: 800, lineHeight: 1.02,
              color: "#FBF3E6", letterSpacing: "-0.025em",
              marginBottom: 22,
            }}>
              Lo que necesitás,<br />
              <span style={{
                background: "linear-gradient(120deg, #C63D2F 0%, #F2762E 45%, #FFC145 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                cerca tuyo.
              </span>
            </h1>

            <p style={{
              fontSize: 18, lineHeight: 1.65,
              color: "rgba(251,243,230,0.6)",
              maxWidth: "44ch", marginBottom: 36,
            }}>
              Pedilo Ya conecta los negocios de tu ciudad con repartidores de tu zona.
              Sin vueltas, sin depender de que llegue de Montevideo.
            </p>

            {/* Location picker */}
            <form role="search" style={{ maxWidth: 460 }}>
              <div style={{
                ...glassStrong,
                borderRadius: 20, padding: 8,
                display: "flex", gap: 8,
              }}>
                <div ref={locationRef} style={{ flex: 1, position: "relative" }}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={locationOpen}
                    onClick={() => setLocationOpen(p => !p)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 8,
                      background: "transparent", border: "none",
                      color: location ? "#FBF3E6" : "rgba(251,243,230,0.45)",
                      fontSize: 15, fontWeight: 600,
                      padding: "12px 14px", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <MapPin size={14} />
                      {location || "¿Dónde estás?"}
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: "rgba(251,243,230,0.35)", flexShrink: 0,
                        transform: locationOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.15s",
                      }}
                    />
                  </button>

                  {locationOpen && (
                    <ul
                      role="listbox"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        right: 0,
                        ...locationsBack,
                        borderRadius: 16, zIndex: 200, padding: 6,
                      }}
                    >
                      {LOCATIONS.map(loc => (
                        <li
                          key={loc}
                          role="option"
                          aria-selected={location === loc}
                          onClick={() => { setLocation(loc); setLocationOpen(false); }}
                          style={{
                            padding: "10px 14px", fontSize: 14, fontWeight: 600,
                            borderRadius: 10, cursor: "pointer", transition: "background 0.1s",
                            color: location === loc ? "#FFC145" : "#FBF3E6",
                            background: location === loc ? "rgba(255,193,69,0.14)" : "transparent",
                          }}
                          onMouseEnter={e => { if (location !== loc) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                          onMouseLeave={e => { if (location !== loc) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #FFC145, #F0A81E)",
                    color: "#2B1A0A", fontWeight: 800, fontSize: 14,
                    padding: "12px 22px", borderRadius: 14, whiteSpace: "nowrap",
                    border: "none", boxShadow: "0 4px 16px rgba(255,193,69,0.3)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => hoverIn(e, { transform: "translateY(-1px)", boxShadow: "0 6px 24px rgba(255,193,69,0.45)" })}
                  onMouseLeave={e => hoverOut(e, { transform: "translateY(0)", boxShadow: "0 4px 16px rgba(255,193,69,0.3)" })}
                >
                  Ver lo que hay
                </button>
              </div>
            </form>
          </div>

          {/* Right: Route SVG */}
          <div
            className="route-stage fade-up-delay zIndex-1"
            style={{
              position: "relative", minHeight: 420,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 500 420" style={{ width: "100%", maxHeight: 420 }}>
              <path
                className="route-path"
                d="M 40,340 C 100,260 90,150 170,120 C 260,86 300,180 380,140 C 430,116 420,60 470,40"
              />
              <circle className="town" cx="40"  cy="340" r="9" />
              <text className="town-label" x="52"  y="345">SEDE</text>
              <circle className="town" cx="170" cy="120" r="7" />
              <text className="town-label" x="180" y="112">RUTA 2</text>
              <circle className="town" cx="380" cy="140" r="7" />
              <text className="town-label" x="392" y="150">CENTRO</text>
              <circle cx="470" cy="40" r="9" fill="#FFC145" opacity="0.85" />
              <text className="town-label" x="425" y="28">DESTINO</text>
              <g className="rider">
                <circle r="16" fill="rgba(198,61,47,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <text x="0" y="5" fontSize="14" textAnchor="middle">🛵</text>
              </g>
            </svg>

            {/* Delivery badge */}
            <div style={{
              position: "absolute", bottom: 20, left: 8,
              ...glassStrong, borderRadius: 16,
              padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 12,
              maxWidth: 240,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg, #4C9A5B, #3a7a48)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(76,154,91,0.4)",
              }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }}>
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Pedido entregado</div>
                <div style={{
                  fontSize: 12, color: "rgba(251,243,230,0.55)",
                  fontFamily: "var(--font-mono)", marginTop: 2,
                }}>
                  14 min · $70 cobrados
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section style={{ padding: "28px 0 16px", zIndex: 1, position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <button
                key={label}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  ...glass(hoveredCat === label ? 0.12 : 0.06),
                  border: `1px solid ${hoveredCat === label ? "rgba(255,193,69,0.4)" : "rgba(255,255,255,0.11)"}`,
                  borderRadius: 999, padding: "10px 18px 10px 12px",
                  fontWeight: 600, fontSize: 14,
                  color: hoveredCat === label ? "#FFC145" : "rgba(251,243,230,0.8)",
                  transform: hoveredCat === label ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={() => setHoveredCat(label)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={15} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="como-funciona" style={{ padding: "80px 0 64px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ marginBottom: 52 }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700, color: "#FBF3E6", letterSpacing: "-0.02em",
            }}>
              Del pedido a la puerta de tu casa
            </h2>
          </div>

          <div
            className="steps-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {STEPS.map(step => (
              <div
                key={step.num}
                style={{
                  ...glass(0.06),
                  borderRadius: 22, padding: "32px 28px",
                  position: "relative", overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => hoverIn(e, { transform: "translateY(-4px)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" })}
                onMouseLeave={e => hoverOut(e, { transform: "translateY(0)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" })}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${step.accent}, transparent)`,
                }} />
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 38, fontWeight: 700,
                  color: step.accent, marginBottom: 18, lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                  color: "#FBF3E6", marginBottom: 10,
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(251,243,230,0.58)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 88px" }}>
        <div
          className="join-grid"
          style={{
            maxWidth: 1180, margin: "0 auto", padding: "0 28px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          }}
        >
          {/* Negocios */}
          <div
            id="negocios"
            style={{
              borderRadius: 26, padding: "44px 40px",
              position: "relative", overflow: "hidden",
              background: "linear-gradient(140deg, rgba(43,26,10,0.96) 0%, rgba(25,15,5,0.98) 100%)",
              border: "1px solid rgba(255,193,69,0.18)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{
              position: "absolute", top: -80, right: -80,
              width: 280, height: 280, pointerEvents: "none",
              background: "radial-gradient(circle, rgba(255,193,69,0.12) 0%, transparent 70%)",
            }} />
            <span style={{
              display: "block", fontFamily: "var(--font-mono)",
              fontSize: 11, fontWeight: 600,
              color: "rgba(255,193,69,0.55)",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18,
            }}>
              Para negocios
            </span>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800,
              color: "#FBF3E6", letterSpacing: "-0.025em",
              lineHeight: 1.12, marginBottom: 14,
            }}>
              Vendé sin límite de vidriera
            </h3>
            <p style={{
              fontSize: 15, lineHeight: 1.65,
              color: "rgba(251,243,230,0.65)",
              maxWidth: "36ch", marginBottom: 30,
            }}>
              Subí tus productos, definí tu zona de entrega y llegá a clientes que hoy no saben que existís.
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #FFC145, #F0A81E)",
                color: "#2B1A0A", fontWeight: 800, fontSize: 15,
                padding: "13px 26px", borderRadius: 999,
                border: "none", boxShadow: "0 4px 20px rgba(255,193,69,0.35)",
                cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => hoverIn(e, { transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(255,193,69,0.5)" })}
              onMouseLeave={e => hoverOut(e, { transform: "translateY(0)", boxShadow: "0 4px 20px rgba(255,193,69,0.35)" })}
            >
              Sumar mi negocio →
            </button>
          </div>

          {/* Repartidores */}
          <div
            id="repartidores"
            style={{
              borderRadius: 26, padding: "44px 40px",
              position: "relative", overflow: "hidden",
              background: "linear-gradient(140deg, rgba(163,47,34,0.28) 0%, rgba(100,28,20,0.22) 100%)",
              border: "1px solid rgba(198,61,47,0.28)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div style={{
              position: "absolute", top: -80, right: -80,
              width: 280, height: 280, pointerEvents: "none",
              background: "radial-gradient(circle, rgba(198,61,47,0.18) 0%, transparent 70%)",
            }} />
            <span style={{
              display: "block", fontFamily: "var(--font-mono)",
              fontSize: 11, fontWeight: 600,
              color: "rgba(251,107,90,0.75)",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18,
            }}>
              Para repartidores
            </span>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800,
              color: "#FBF3E6", letterSpacing: "-0.025em",
              lineHeight: 1.12, marginBottom: 14,
            }}>
              Cobrá al toque, cuando quieras
            </h3>
            <p style={{
              fontSize: 15, lineHeight: 1.65,
              color: "rgba(251,243,230,0.65)",
              maxWidth: "36ch", marginBottom: 30,
            }}>
              Aceptá los pedidos que quieras, cuando te convenga. Cobrás cada entrega al instante, sin esperar a fin de semana.
            </p>
            <button
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#FBF3E6", fontWeight: 800, fontSize: 15,
                padding: "13px 26px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseEnter={e => hoverIn(e, { background: "rgba(255,255,255,0.2)", transform: "translateY(-2px)" })}
              onMouseLeave={e => hoverOut(e, { background: "rgba(255,255,255,0.1)", transform: "translateY(0)" })}
            >
              Quiero repartir →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        id="ayuda"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "52px 0 32px",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: 32,
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 22,
                fontWeight: 800, color: "#C63D2F",
              }}>
                Pedilo<span style={{ color: "#FFC145" }}>Ya</span>
              </div>
              <p style={{
                marginTop: 10, fontSize: 14,
                color: "rgba(251,243,230,0.38)", maxWidth: "22ch",
              }}>
                Del interior, para el interior.
              </p>
            </div>

            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              {[
                {
                  title: "Producto",
                  links: [["Cómo funciona", "#como-funciona"], ["Para negocios", "#negocios"], ["Para repartidores", "#repartidores"]],
                },
                {
                  title: "Ayuda",
                  links: [["Centro de ayuda", "#"], ["Contacto", "#"], ["Términos", "#"]],
                },
                {
                  title: "Seguinos",
                  links: [["Instagram", "#"], ["WhatsApp", "#"]],
                },
              ].map(col => (
                <div key={col.title}>
                  <h4 style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    color: "rgba(251,243,230,0.3)", marginBottom: 14,
                  }}>
                    {col.title}
                  </h4>
                  {col.links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      style={{
                        display: "block", fontSize: 14, fontWeight: 500,
                        color: "rgba(251,243,230,0.55)", marginBottom: 9,
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={e => hoverIn(e, { color: "#FFC145" })}
                      onMouseLeave={e => hoverOut(e, { color: "rgba(251,243,230,0.55)" })}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: 44, paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: 8,
            fontSize: 13, color: "rgba(251,243,230,0.3)",
          }}>
            <span>© 2026 Pedilo Ya · Uruguay</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>Hecho en el interior 🇺🇾</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
