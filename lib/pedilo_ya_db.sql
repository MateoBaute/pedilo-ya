-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2026 a las 04:39:07
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
(23, 'Avenida Central'),
(24, 'Barrio Sur'),
(25, 'Centro Comercial Altamira'),
(22, 'Plaza Norte'),
(21, 'Zona Centro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `stores_id` int(11) NOT NULL,
  `description` varchar(350) DEFAULT NULL,
  `location` varchar(45) NOT NULL,
  `image_url` varchar(255) DEFAULT '/uploads/default-product.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `price`, `name`, `category`, `stores_id`, `description`, `location`, `image_url`) VALUES
(86, 799, 'Smartphone Galaxy X', 'Electrónica', 26, 'Teléfono inteligente con 128GB de almacenamiento y pantalla AMOLED.', 'Zona Centro', '/uploads/default-product.png'),
(87, 150, 'Auriculares Inalámbricos', 'Electrónica', 26, 'Auriculares con cancelación de ruido activa y batería de larga duración.', 'Plaza Norte', '/uploads/default-product.png'),
(88, 24, 'Camiseta Algodón Premium', 'Ropa', 27, 'Camiseta básica de corte clásico 100% algodón, color negro.', 'Plaza Norte', '/uploads/default-product.png'),
(89, 55, 'Sudadera con Capucha', 'Ropa', 27, 'Sudadera unisex de algodón con interior abrigado y bolsillos.', 'Plaza Norte', '/uploads/default-product.png'),
(90, 1200, 'Laptop Pro 15', 'Computación', 28, 'Computadora portátil de alto rendimiento con 16GB de RAM y SSD.', 'Avenida Central', '/uploads/default-product.png'),
(91, 85, 'Teclado Mecánico RGB', 'Computación', 28, 'Teclado con switches mecánicos rápidos y luces personalizables.', 'Avenida Central', '/uploads/default-product.png'),
(92, 15, 'Cafetera de Émbolo', 'Hogar', 29, 'Cafetera de prensa francesa de vidrio resistente para café filtrado.', 'Barrio Sur', '/uploads/default-product.png'),
(93, 8, 'Café Espresso Italiano', 'Bebidas', 29, 'Café intenso e italiano de grano seleccionado y tostado medio.', 'Zona Centro', '/uploads/default-product.png'),
(94, 45, 'Zapatillas Deportivas', 'Calzado', 30, 'Calzado cómodo y ergonómico ideal para correr o entrenar.', 'Centro Comercial Altamira', '/uploads/default-product.png'),
(95, 18, 'Botella Térmica de Acero', 'Hogar', 30, 'Mantiene tus líquidos fríos por 24 horas y calientes por 12 horas.', 'Plaza Norte', '/uploads/default-product.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `store_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `comment`, `rating`, `store_id`, `created_at`) VALUES
(11, 'Excelente servicio y productos tecnológicos de primera calidad.', 5, 26, '2026-07-23 02:35:55'),
(12, 'El cargador que compré funciona de diez, volveré a comprar.', 4, 26, '2026-07-23 02:35:55'),
(13, 'La ropa es bonita y de buen material, pero la atención fue un poco lenta.', 4, 27, '2026-07-23 02:35:55'),
(14, 'El paraíso de todo gamer, excelente variedad de componentes y periféricos.', 5, 28, '2026-07-23 02:35:55'),
(15, 'Muy buenos precios en mouses y teclados mecánicos.', 5, 28, '2026-07-23 02:35:55'),
(16, 'Los mejores croissants de la zona y el café espresso está siempre en su punto.', 5, 29, '2026-07-23 02:35:55'),
(17, 'Tienen artículos de decoración muy lindos, aunque algunos precios son algo elevados.', 4, 30, '2026-07-23 02:35:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `average_rating` decimal(3,2) DEFAULT 0.00,
  `location` varchar(45) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stores`
--

INSERT INTO `stores` (`id`, `name`, `description`, `address`, `average_rating`, `location`) VALUES
(26, 'TecnoShop Centro', 'Tienda especializada en tecnología y accesorios de última generación.', 'Av. Principal 123', 4.80, 'Zona Centro'),
(27, 'Moda Express', 'Tu ropa favorita al mejor precio, tendencias para todas las temporadas.', 'Calle Norte 456', 4.20, 'Plaza Norte'),
(28, 'Gamer Zone', 'Todo para el setup de tus sueños: componentes, periféricos y consolas.', 'Paseo Central 789', 4.90, 'Avenida Central'),
(29, 'Bake & Coffee', 'Cafetería de especialidad artesanal y pastelería fina recién horneada.', 'Esquina Sur 321', 4.60, 'Barrio Sur'),
(30, 'Hogar & Estilo', 'Artículos únicos de decoración, organización y bazar para tu cocina.', 'Local 15 - CC Altamira', 4.40, 'Centro Comercial Altamira');

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
  ADD KEY `fk_products_location` (`location`),
  ADD KEY `fk_products_stores` (`stores_id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_stores` (`store_id`);

--
-- Indices de la tabla `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stores_location` (`location`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_locations` FOREIGN KEY (`location`) REFERENCES `locations` (`name`),
  ADD CONSTRAINT `fk_products_stores` FOREIGN KEY (`stores_id`) REFERENCES `stores` (`id`);

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_stores` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

--
-- Filtros para la tabla `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `fk_stores_location` FOREIGN KEY (`location`) REFERENCES `locations` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
