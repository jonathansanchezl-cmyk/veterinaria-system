
CREATE DATABASE veterinaria;

USE veterinaria;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    rol VARCHAR(50)
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    dni VARCHAR(20),
    telefono VARCHAR(20)
);

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    nombre VARCHAR(100),
    especie VARCHAR(50),
    raza VARCHAR(50),
    edad INT
);

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT,
    fecha DATETIME,
    estado VARCHAR(50)
);
