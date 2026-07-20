# Pedilo Ya — Contexto del proyecto

App web de pedidos tipo Pedidos Ya, pero enfocada en el interior de Uruguay (no Montevideo/Maldonado). Conecta tres roles: clientes, negocios/emprendimientos, y repartidores.

## Roles y flujo básico

- **Cliente:** elige su región/localidad, ve solo negocios que cubren esa zona, arma su carrito y paga con Mercado Pago.
- **Negocio/emprendimiento:** se da de alta, publica su región de cobertura y sus productos, gestiona pedidos entrantes.
- **Repartidor:** ve pedidos disponibles en su zona, los acepta, entrega, y cobra de forma inmediata.

## Flujo de estados del pedido

```
Pendiente → Aceptado por la empresa → Listo para retirar → En camino → Entregado
(en cualquier punto puede pasar a: Cancelado)
```

## Decisiones ya confirmadas (no reabrir sin motivo)

### Pago a repartidores — pago inmediato
- El dinero NO pasa de mano en mano entre negocio y repartidor. Todo pasa por la plataforma vía Mercado Pago.
- Cliente paga producto + envío → la plataforma acredita al negocio el precio del producto, acredita al repartidor la tarifa de envío **de forma inmediata** (no acumulado/semanal), y retiene su comisión.
- Motivo: la app funciona también como changa flexible — alguien sin plata tiene que poder entrar, aceptar 2-3 repartos, y cobrar ese mismo día. Esto descarta el modelo de pago acumulado semanal.
- Tarifa = monto fijo mínimo garantizado + variable por km recorrido (calculable con API de distancias tipo Google Maps Distance Matrix). El repartidor ve el monto estimado ANTES de aceptar el pedido.
- Implicancia técnica: cada entrega dispara una transferencia individual vía Mercado Pago apenas se marca "Entregado" → más transacciones/comisiones de MP que un modelo por lote, contemplar esto en la comisión de la plataforma.
- Mantener panel de historial de entregas y pagos por repartidor para trazabilidad.
- En la base de datos esto se modela con dos tablas separadas: `pagos` (cobro del cliente vía Mercado Pago) y `transferencias_repartidor` (pago inmediato al repartidor). La escritura de ambas debería hacerse desde una Edge Function con la service role key (webhook de Mercado Pago), nunca directo desde el cliente.

### Zonas de cobertura
- "Región" = unidad geográfica base debe ser ciudad/localidad (tabla `localidades`), NO departamento completo (departamento es demasiado amplio).
- Cada negocio define su propio radio de cobertura (`radio_cobertura_km`) desde su sede.
- El cliente solo ve productos de negocios cuyo radio alcanza su dirección.

### Verificación de emprendimientos
- Validar RUT o cédula del titular antes de habilitar publicación de productos (`negocios.rut_cedula`, `negocios.verificado`).
- Confirmar teléfono (SMS/WhatsApp) — `profiles.telefono_verificado`.
- Insignia de "verificado" visible para el cliente.

### Sistema de calificaciones
- Cliente califica repartidor y negocio tras cada entrega.
- Repartidor puede calificar al cliente (dirección incorrecta, no atendió, etc.).
- Se modela en una sola tabla `calificaciones` con un campo `tipo` (`cliente_a_negocio`, `cliente_a_repartidor`, `repartidor_a_cliente`), no en tres tablas separadas.
- Calificación baja sostenida → revisión manual del perfil.

### Plataforma técnica
- Next.js (App Router), configuración estándar de `create-next-app` — **Tailwind v4** (usa `@import "tailwindcss";` en `globals.css`, no los directives viejos `@tailwind base/components/utilities`).
- Arrancar como app web responsive (no nativa).
- Push notifications reales (importantes para repartidores en movimiento) son limitadas en web, sobre todo iOS — evaluar PWA o nativa más adelante, no bloqueante ahora.

### Tema legal pendiente
- Uruguay tiene debate abierto sobre relación laboral de repartidores de plataformas (¿contratista independiente o empleado?). No resolver ahora, pero sí tener T&C claros desde el día uno sobre el vínculo repartidor-app.

## Branding

**Paleta:**
- Rojo primario: `#C63D2F` (rojo-dark `#A32F22` para hover/estados)
- Naranja secundario: `#F2762E`
- Amarillo CTA: `#FFC145` (deep `#F0A81E` para hover)
- Verde éxito/entregado: `#4C9A5B`
- Texto/ink: `#2B2016` (texto suave `#5B4B3D`)
- Fondo papel: `#FBF3E6` (alterno `#F3E1C7`, líneas `#E7CFA9`)

**Tipografía:**
- Encabezados/display: Baloo 2 (weights 500–800), cargada vía `next/font/google` como `--font-display`
- Cuerpo: DM Sans, `--font-body`
- Datos/mono (tiempos, distancias, montos): JetBrains Mono, `--font-mono`

**Tono de voz:** cercano, directo, con modismos uruguayos livianos. Nada corporativo/frío. Ejemplo real usado: "Cobrá al toque, cuando quieras."

**Elemento de marca distintivo:** motivo de ruta punteada animada (repartidor en moto recorriendo un camino entre pueblos) usado en el hero — refuerza visualmente el modelo de cobertura regional. Reutilizar esta idea (ruta/camino) como hilo conductor visual en otras pantallas si aplica (ej. seguimiento de pedido en tiempo real).

## Estructura de páginas (sitemap)

1. `index.html` / `app/page.tsx` — Home/landing: selector de región, categorías, cómo funciona (3 pasos), CTAs dobles (negocio/repartidor) — **ya construido**
2. `productos.html` / `tienda.html` — Catálogo con filtros por categoría + buscador
3. `detalle.html` — Detalle de producto/negocio
4. `carrito.html` — Carrito/checkout con Mercado Pago
5. `panel-negocio.html` — Alta de productos, gestión de pedidos, historial de ventas
6. `panel-repartidor.html` — Pedidos disponibles, historial de entregas y pagos
7. `registro.html` / `login.html` — Formulario único con selector de rol
8. `contacto.html` — Soporte y reclamos

Header global: logo + selector de región + cuenta/carrito.
Footer global: legales, contacto, redes.

## Base de datos (Supabase / Postgres)

Esquema completo con 12 tablas, 4 enums, RLS activado en todas, en `schema.sql` (correrlo entero en el SQL Editor de Supabase). Tablas: `profiles`, `localidades`, `negocios`, `repartidores`, `categorias`, `productos`, `direcciones_cliente`, `pedidos`, `items_pedido`, `pagos`, `transferencias_repartidor`, `calificaciones`.

Puntos clave del esquema:
- `profiles` extiende `auth.users` de Supabase (no es una tabla de autenticación propia).
- `pedidos.total` tiene un `check constraint` que exige `total = subtotal_productos + tarifa_envio`.
- Ver `schema.sql` para las políticas de RLS completas por tabla — en particular, `pagos` y `transferencias_repartidor` están pensadas para escribirse solo desde una Edge Function con service role key, no desde el cliente.

## Bug abierto / pendiente de diagnosticar

Al portar el mockup HTML a Next.js + Tailwind (`app/page.tsx`), aparecieron problemas visuales en el entorno del usuario que **no** aparecían en el mockup HTML original (`index.html`): texto superpuesto en el hero (la tarjeta "pedido entregado" pisa el título), el SVG de la ruta se ve cortado a un rincón, y las tarjetas de "Sumar mi negocio" / "Quiero repartir" pierden parte del contenido.

Hipótesis de trabajo: se usaron muchas clases Tailwind arbitrarias encadenadas (alturas responsivas `h-[260px] md:h-[420px]`, `order-first`, sombras compuestas `shadow-[6px_6px_0_#2B2016]`) que son frágiles si el entorno de preview no compila exactamente igual que un `npm run dev` real del proyecto. **No se confirmó todavía** si el usuario está corriendo el proyecto Next.js real o previsualizando en otra herramienta — esa es la primera pregunta a resolver antes de seguir parchando. Si se confirma que es el proyecto real y el bug persiste, el plan es reescribir esas secciones (hero/ilustración de ruta, tarjetas CTA) usando clases CSS nombradas en `globals.css` en vez de utilities arbitrarias encadenadas, replicando el CSS del `index.html` original que sí funcionaba bien.

## Archivos de referencia en este repo

- `index.html` — mockup funcional del home con la paleta y tipografía definitivas (referencia visual de cómo se ve bien).
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css` — versión Next.js/Tailwind del home (tiene el bug abierto de arriba).
- `schema.sql` — DDL completo de Supabase: tablas, enums, índices, triggers y RLS.
