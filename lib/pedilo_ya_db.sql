-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2026 a las 00:05:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pedilo_ya_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(8, 'Avenida Central'),
(9, 'Barrio Sur'),
(10, 'Centro Comercial Altamira'),
(7, 'Plaza Norte'),
(6, 'Zona Centro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `description` varchar(350) DEFAULT NULL,
  `location` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `price`, `name`, `category`, `shop_id`, `description`, `location`) VALUES
(6, 800, 'Smartphone Galaxy X', 'Electrónica', 1, 'Teléfono inteligente con 128GB de almacenamiento y cámara de 64MP.', 'Zona Centro'),
(7, 25, 'Camiseta Algodón Premium', 'Ropa', 2, 'Camiseta básica de corte clásico 100% algodón, color negro.', 'Plaza Norte'),
(8, 1200, 'Laptop Pro 15', 'Computación', 1, 'Computadora portátil con procesador de última generación y 16GB de RAM.', 'Avenida Central'),
(9, 16, 'Cafetera de Émbolo', 'Hogar', 3, 'Cafetera de prensa francesa de vidrio borosilicatado de 1 litro.', 'Barrio Sur'),
(10, 45, 'Zapatillas Deportivas', 'Calzado', 2, 'Calzado cómodo e ideal para correr o ir al gimnasio, color gris.', 'Centro Comercial Altamira'),
(11, 13, 'Hamburguesa Doble Queso', 'Comida', 4, 'Hamburguesa con doble carne, queso cheddar y papas fritas.', 'Zona Centro'),
(12, 8, 'Café Espresso Italiano', 'Bebidas', 5, 'Café intenso de grano seleccionado, 250ml.', 'Zona Centro'),
(13, 35, 'Libro de Programación Next.js', 'Librería', 6, 'Guía completa desde cero para dominar el App Router.', 'Zona Centro'),
(14, 150, 'Auriculares Inalámbricos', 'Electrónica', 1, 'Auriculares con cancelación de ruido activa y batería de 30 horas.', 'Plaza Norte'),
(15, 55, 'Sudadera con Capucha', 'Ropa', 2, 'Sudadera unisex de algodón con interior abrigado, color azul.', 'Plaza Norte'),
(16, 19, 'Botella Térmica de Acero', 'Hogar', 3, 'Mantiene líquidos fríos por 24 horas y calientes por 12 horas.', 'Plaza Norte'),
(17, 85, 'Teclado Mecánico RGB', 'Computación', 1, 'Teclado con switches red, distribución en español y luces personalizables.', 'Avenida Central'),
(18, 42, 'Mochila Impermeable', 'Accesorios', 2, 'Mochila con compartimento para laptop de hasta 15.6 pulgadas.', 'Avenida Central'),
(19, 23, 'Set de Ollas Antiadherentes', 'Hogar', 3, 'Juego de 3 piezas de aluminio con revestimiento de teflón.', 'Avenida Central'),
(20, 7, 'Porción de Torta de Chocolate', 'Repostería', 5, 'Bizcochuelo húmedo relleno de dulce de leche y cobertura de fudge.', 'Barrio Sur'),
(21, 65, 'Lentes de Sol Polarizados', 'Moda', 2, 'Protección UV400 con marco de acetato negro mate.', 'Barrio Sur'),
(22, 14, 'Planta Suculenta en Maceta', 'Jardinería', 7, 'Planta decorativa de bajo mantenimiento en maceta de cerámica.', 'Barrio Sur'),
(23, 300, 'Monitor Gamer 24\" 144Hz', 'Computación', 1, 'Pantalla Full HD con tiempo de respuesta de 1ms e FreeSync.', 'Centro Comercial Altamira'),
(24, 95, 'Reloj Inteligente Fit', 'Deportes', 8, 'Monitoreo de ritmo cardíaco, pasos, sueño y notificaciones.', 'Centro Comercial Altamira'),
(25, 110, 'Chaqueta de Cuero Sintético', 'Ropa', 2, 'Chaqueta moderna con cierre cruzado, color marrón.', 'Centro Comercial Altamira');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_location` (`location`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_location` FOREIGN KEY (`location`) REFERENCES `locations` (`name`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
