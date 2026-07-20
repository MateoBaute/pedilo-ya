"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Utensils, ShoppingBag, Pill, Croissant, Beer, Wrench, Gift, ChevronDown, MapPin } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const locations = [
    "Mercedes, Soriano",
    "Dolores, Soriano",
    "Fray Bentos, Río Negro",
    "Young, Río Negro",
    "Trinidad, Flores",
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("pedilo-theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem("pedilo-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      window.localStorage.setItem("pedilo-theme", "light");
    }
  }, [isDark]);

  const categories = [
    { icon: Utensils, label: "Comida" },
    { icon: ShoppingBag, label: "Almacén" },
    { icon: Pill, label: "Farmacia" },
    { icon: Croissant, label: "Panadería" },
    { icon: Beer, label: "Bebidas" },
    { icon: Wrench, label: "Ferretería" },
    { icon: Gift, label: "Regalos" },
  ];
  return (
    <>
      <header className="site-header">
        <div className="wrap nav">
          <div className="logo">
            Pedilo<span className="logo-accent">Ya</span>
          </div>
          <nav className="nav-links" aria-label="Navegación principal">
            <a className="nav-link" href="#como-funciona">Cómo funciona</a>
            <a className="nav-link" href="#negocios">Negocios</a>
            <a className="nav-link" href="#repartidores">Repartidores</a>
            <a className="nav-link" href="#ayuda">Ayuda</a>
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Cambiar tema"
              type="button"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/login" className="nav-cta">Iniciar sesión</Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              <span className="pulse" />
              Hecho para el interior
            </span>
            <h1 className="hero-title">
              Lo que necesitás,
              <br />
              <span>cerca tuyo.</span>
            </h1>
            <p className="hero-copy">
              Pedilo Ya conecta los negocios de tu ciudad con repartidores de tu
              zona. Sin vueltas, sin depender de que llegue de Montevideo.
            </p>

            <form className="region-picker" role="search" aria-label="Elegir localidad">
              <div className="custom-select" ref={locationRef}>
                <button
                  type="button"
                  className="custom-select-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={locationOpen}
                  onClick={() => setLocationOpen((prev) => !prev)}
                >
                  <span className={location ? "" : "custom-select-placeholder"}>
                    <MapPin size={14} />
                    {location || "¿Dónde estás?"}
                  </span>
                  <ChevronDown size={15} />
                </button>
                {locationOpen && (
                  <ul className="custom-select-dropdown" role="listbox">
                    {locations.map((loc) => (
                      <li
                        key={loc}
                        role="option"
                        aria-selected={location === loc}
                        className={`custom-select-option${location === loc ? " selected" : ""}`}
                        onClick={() => {
                          setLocation(loc);
                          setLocationOpen(false);
                        }}
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="hero-button" type="submit">
                Ver lo que hay
              </button>
            </form>
            <p className="hero-note">🟢 24 negocios activos hoy en tu región</p>
          </div>

          <div className="route-stage" aria-hidden="true">
            <svg viewBox="0 0 500 420">
              <path
                className="route-path"
                d="M 40,340 C 100,260 90,150 170,120 C 260,86 300,180 380,140 C 430,116 420,60 470,40"
              />
              <circle className="town" cx="40" cy="340" r="9" />
              <text className="town-label" x="52" y="345">SEDE</text>
              <circle className="town" cx="170" cy="120" r="7" />
              <text className="town-label" x="180" y="112">RUTA 2</text>
              <circle className="town" cx="380" cy="140" r="7" />
              <text className="town-label" x="392" y="150">CENTRO</text>
              <circle className="town" cx="470" cy="40" r="9" fill="#FFC145" />
              <text className="town-label" x="425" y="28">DESTINO</text>

              <g className="rider">
                <circle r="15" fill="#C63D2F" stroke="#2B2016" strokeWidth="2.5" />
                <text x="0" y="5" fontSize="15" textAnchor="middle">
                  🛵
                </text>
              </g>
            </svg>

            <div className="parcel-card">
              <div className="parcel-badge">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="parcel-title">Pedido entregado</div>
                <div className="parcel-subtitle">14 min · $70 cobrados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="wrap">
          <div className="cat-row">
            {categories.map((item) => (
              <div key={item.label} className="cat-pill">
                <span className="cat-icon">
                  <item.icon />
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how" id="como-funciona">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">
              <span className="pulse" />
              El recorrido
            </span>
            <h2>Del pedido a la puerta de tu casa</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Elegí tu zona</h3>
              <p>
                Seleccioná tu ciudad y vas a ver solo lo que realmente te pueden
                entregar ahí, sin sorpresas de cobertura.
              </p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Armá tu pedido</h3>
              <p>
                Elegís el producto, ves el precio real con el envío incluido, y
                pagás con Mercado Pago desde la app.
              </p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Lo recibís rapidito</h3>
              <p>
                Un repartidor de tu zona lo levanta y te lo lleva. Seguís el
                pedido en tiempo real hasta que golpea la puerta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="join">
        <div className="wrap join-grid">
          <div id="negocios" className="join-card negocio">
            <span className="tag">Para negocios</span>
            <h3>Vendé sin límite de vidriera</h3>
            <p>
              Subí tus productos, definí tu zona de entrega y llegá a clientes
              que hoy no saben que existís.
            </p>
            <button className="cta-button">Sumar mi negocio →</button>
            <svg className="deco" viewBox="0 0 100 100">
              <rect x="10" y="30" width="80" height="55" rx="6" fill="white" />
              <rect x="25" y="15" width="50" height="20" rx="4" fill="white" />
            </svg>
          </div>

          <div id="repartidores" className="join-card repartidor">
            <span className="tag">Para repartidores</span>
            <h3>Cobrá al toque, cuando quieras</h3>
            <p>
              Aceptá los pedidos que quieras, cuando te convenga. Cobrás cada
              entrega al instante, sin esperar a fin de semana.
            </p>
            <button className="cta-button-alt">Quiero repartir →</button>
            <svg className="deco" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeDasharray="10 8"
              />
            </svg>
          </div>
        </div>
      </section>

      <footer id="ayuda">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-logo">Pedilo Ya</div>
              <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-soft)", maxWidth: "26ch" }}>
                Del interior, para el interior.
              </p>
            </div>
            <div className="foot-links">
              <div className="foot-col">
                <h4>Producto</h4>
                <a href="#como-funciona">Cómo funciona</a>
                <a href="#negocios">Para negocios</a>
                <a href="#repartidores">Para repartidores</a>
              </div>
              <div className="foot-col">
                <h4>Ayuda</h4>
                <a href="#">Centro de ayuda</a>
                <a href="#">Contacto</a>
                <a href="#">Términos y condiciones</a>
              </div>
              <div className="foot-col">
                <h4>Seguinos</h4>
                <a href="#">Instagram</a>
                <a href="#">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Pedilo Ya · Uruguay</span>
            <span className="font-mono-custom">Hecho en el interior 🇺🇾</span>
          </div>
        </div>
      </footer>
    </>
  );
}