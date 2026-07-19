


USE veterinaria;

show tables;





DESCRIBE clientes;
DESCRIBE USUARIOS;

DESCRIBE CITA;
DESCRIBE DOCTORES;


SELECT * FROM MASCOTAS;
SELECT * FROM CLIENTES;
SELECT * FROM DOCTORES;
SELECT * FROM USUARIOS;
SELECT * FROM CLIENTES;
SELECT * FROM CITAS;


USE veterinaria;

show tables;
DROP table historial_clinico
DROP table vacunas

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota VARCHAR(100),
    propietario VARCHAR(100),
    doctor VARCHAR(100),
    fecha VARCHAR(50),
    hora VARCHAR(50),
    motivo VARCHAR(255),
    estado VARCHAR(50)
);

CREATE TABLE mascotas (

    id INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100),

    especie VARCHAR(50),

    raza VARCHAR(100),

    edad VARCHAR(20),

    sexo VARCHAR(20),

    propietario VARCHAR(100),

    foto VARCHAR(500),

    estado VARCHAR(30)

);

CREATE TABLE operadores (

    id INT PRIMARY KEY AUTO_INCREMENT,

    nombre VARCHAR(100),

    email VARCHAR(100),

    password VARCHAR(255),

    rol VARCHAR(50)

);

USE veterinaria;

-- ======================================
-- TABLA HISTORIAL CLINICO
-- ======================================

CREATE TABLE IF NOT EXISTS historial_clinico (

    id INT AUTO_INCREMENT PRIMARY KEY,

    mascota_id INT NOT NULL,

    mascota VARCHAR(150),

    propietario VARCHAR(150),

    doctor VARCHAR(150),

    fecha DATE,

    motivo TEXT,

    diagnostico TEXT,

    tratamiento TEXT,

    observaciones TEXT,

    peso DECIMAL(5,2),

    temperatura DECIMAL(4,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ======================================
-- TABLA VACUNAS
-- ======================================

CREATE TABLE IF NOT EXISTS vacunas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    mascota_id INT NOT NULL,

    mascota VARCHAR(150),

    vacuna VARCHAR(150),

    fecha DATE,

    proximo_refuerzo DATE,

    estado VARCHAR(50) DEFAULT 'ACTIVA',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ======================================
-- TABLA ALERGIAS
-- ======================================

CREATE TABLE IF NOT EXISTS alergias (

    id INT AUTO_INCREMENT PRIMARY KEY,

    mascota_id INT NOT NULL,

    mascota VARCHAR(150),

    descripcion TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS historial_clinico (

  id INT AUTO_INCREMENT PRIMARY KEY,

  mascota VARCHAR(100),

  doctor VARCHAR(100),

  diagnostico TEXT,

  tratamiento TEXT,

  observaciones TEXT,

  peso VARCHAR(50),

  temperatura VARCHAR(50),

  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

DROP TABLE IF EXISTS historial_clinico;

CREATE TABLE historial_clinico (

  id INT AUTO_INCREMENT PRIMARY KEY,

  mascota VARCHAR(150),
  doctor VARCHAR(150),

  diagnostico TEXT,
  tratamiento TEXT,
  observaciones TEXT,

  peso VARCHAR(50),
  temperatura VARCHAR(50),

  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

ALTER TABLE mascotas

ADD COLUMN id_cliente INT;



UPDATE mascotas

SET id_cliente = 1

WHERE propietario='Jonathan Sanchez';

ALTER TABLE mascotas

ADD CONSTRAINT fk_mascota_cliente

FOREIGN KEY(id_cliente)

REFERENCES clientes(id);

SELECT * FROM mascotas;

SHOW CREATE TABLE mascotas;




ALTER TABLE mascotas
ADD CONSTRAINT fk_mascota_cliente
FOREIGN KEY (id_cliente)
REFERENCES clientes(id);



SELECT
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'mascotas'
  AND REFERENCED_TABLE_NAME IS NOT NULL;
  
ALTER TABLE citas
ADD COLUMN id_cliente INT NULL,
ADD COLUMN id_mascota INT NULL,
ADD COLUMN id_doctor INT NULL;


UPDATE citas c
INNER JOIN clientes cl
    ON TRIM(c.propietario) = TRIM(cl.nombre)
SET c.id_cliente = cl.id;

SELECT
    id,
    propietario,
    id_cliente
FROM citas;

SELECT *
FROM citas
WHERE id_cliente IS NULL
   OR id_mascota IS NULL
   OR id_doctor IS NULL;
   
   
   SELECT
    propietario,
    COUNT(*) cantidad
FROM citas
GROUP BY propietario;

SELECT
id,
nombre
FROM clientes;

SELECT *
FROM citas
WHERE propietario IN (
    'pepe',
    '2r2r23',
    'Nestor',
    'Nestor Ortiz'
);

DELETE FROM citas
WHERE propietario IN (
    'pepe',
    '2r2r23',
    'Nestor',
    'Nestor Ortiz'
);

SELECT
    propietario,
    COUNT(*) AS cantidad
FROM citas
GROUP BY propietario;


UPDATE citas c
INNER JOIN clientes cl
    ON LOWER(TRIM(c.propietario)) = LOWER(TRIM(cl.nombre))
SET c.id_cliente = cl.id;

SELECT
    id,
    propietario,
    id_cliente
FROM citas;

SELECT
    id,
    propietario,
    id_cliente
FROM citas;

UPDATE citas c
INNER JOIN clientes cl
    ON LOWER(TRIM(c.propietario)) = LOWER(TRIM(cl.nombre))
SET c.id_cliente = cl.id;

SELECT
id,
propietario,
id_cliente
FROM citas;

UPDATE citas c
INNER JOIN mascotas m
    ON LOWER(TRIM(c.mascota)) = LOWER(TRIM(m.nombre))
SET c.id_mascota = m.id;

SELECT
id,
mascota,
id_mascota
FROM citas;

SELECT
id,
nombres
FROM doctores;

UPDATE citas c
INNER JOIN doctores d
    ON LOWER(TRIM(c.doctor)) = LOWER(TRIM(d.nombres))
SET c.id_doctor = d.id;

SELECT id, nombres
FROM doctores;

SELECT *
FROM citas
WHERE id_cliente IS NULL
   OR id_mascota IS NULL
   OR id_doctor IS NULL;

UPDATE doctores
SET nombres='Leonardo Contreras'
WHERE id=2;

SELECT
id,
nombres
FROM doctores;

SELECT
id,
doctor
FROM citas;

UPDATE citas
SET doctor='Leonardo Contreras'
WHERE doctor='leo';

UPDATE citas c
INNER JOIN doctores d
ON LOWER(TRIM(c.doctor)) = LOWER(TRIM(d.nombres))
SET c.id_doctor = d.id;

SELECT *
FROM citas
WHERE id_cliente IS NULL
   OR id_mascota IS NULL
   OR id_doctor IS NULL;
   
   SELECT id, nombres FROM doctores;
   
   UPDATE citas
SET doctor = 'Leonardo Contreras'
WHERE doctor = 'leo';
   
   UPDATE citas c
INNER JOIN doctores d
    ON LOWER(TRIM(c.doctor)) = LOWER(TRIM(d.nombres))
SET c.id_doctor = d.id;
   
   SELECT
    id,
    doctor,
    id_doctor
FROM citas;

SELECT *
FROM citas
WHERE id_cliente IS NULL
   OR id_mascota IS NULL
   OR id_doctor IS NULL;
   
   ALTER TABLE citas
ADD CONSTRAINT fk_cita_cliente
FOREIGN KEY (id_cliente)
REFERENCES clientes(id);
   
   ALTER TABLE citas
ADD CONSTRAINT fk_cita_mascota
FOREIGN KEY (id_mascota)
REFERENCES mascotas(id);
   

   
SHOW CREATE TABLE citas;

SHOW CREATE TABLE mascotas;

SHOW CREATE TABLE clientes;

SELECT
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'citas'
  AND REFERENCED_TABLE_NAME IS NOT NULL;

   
   SELECT
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'mascotas'
  AND REFERENCED_TABLE_NAME IS NOT NULL;

SET SQL_SAFE_UPDATES = 0;
   
   UPDATE mascotas
SET estado='ACTIVO'
WHERE estado IS NULL;
   
   
   ALTER TABLE usuarios
ADD COLUMN usuario VARCHAR(50) UNIQUE AFTER nombre,
ADD COLUMN estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO' AFTER rol,
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP;
   
   DESCRIBE USUARIOS;
   select * from usuarios;
   
   
   
   
   UPDATE usuarios
SET usuario = 'admin'
WHERE id = 1;
   
   UPDATE usuarios
SET rol = 'ADMINISTRADOR'
WHERE id = 1;
   
   
   CREATE TABLE historia_clinica(

id INT AUTO_INCREMENT PRIMARY KEY,

id_mascota INT NOT NULL,

fecha DATE,

peso DECIMAL(5,2),

temperatura DECIMAL(4,2),

diagnostico TEXT,

tratamiento TEXT,

observaciones TEXT,

id_doctor INT,

createdAt DATETIME,

updatedAt DATETIME

);
   
   
   CREATE TABLE vacunas(

id INT AUTO_INCREMENT PRIMARY KEY,

id_mascota INT,

vacuna VARCHAR(100),

fecha DATE,

proxima DATE

);
   
   CREATE TABLE desparasitaciones(

id INT AUTO_INCREMENT PRIMARY KEY,

id_mascota INT,

fecha DATE,

producto VARCHAR(100)

);

CREATE TABLE archivos(

id INT AUTO_INCREMENT PRIMARY KEY,

id_mascota INT,

nombre VARCHAR(200),

ruta VARCHAR(300),

tipo VARCHAR(50)

);
   
   
   