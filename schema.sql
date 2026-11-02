-- Database Schema for Pascolli Citrus Website
-- Can be imported into MySQL / MariaDB

CREATE DATABASE IF NOT EXISTS pascolli_citrus DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pascolli_citrus;

-- Table for Juice Products
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    price_5l DECIMAL(10,2) NOT NULL DEFAULT 30.00,
    price_2l DECIMAL(10,2) NOT NULL DEFAULT 15.00,
    price_500ml DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Orders Log
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Products Data
INSERT INTO products (id, name, description, image_url, price_5l, price_2l, price_500ml) VALUES
('p1', 'Suco de Laranja', 'Laranja fresca, docinha e com aquele frescor cítrico de suco recém-espremido.', 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80', 30.00, 15.00, 5.00),
('p2', 'Suco de Morango', 'Morangos maduros, perfumados e naturally doces, na textura certa.', 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80', 30.00, 15.00, 5.00),
('p3', 'Suco de Maracujá', 'Azedinho na medida, aromático e refrescante, puro suco natural.', 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80', 30.00, 15.00, 5.00),
('p4', 'Suco de Caju', 'O sabor marcante e tropical do caju, encorpado e naturalmente adocicado.', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', 30.00, 15.00, 5.00);
