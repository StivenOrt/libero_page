DROP DATABASE IF EXISTS Libero;

CREATE DATABASE Libero
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE Libero;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO roles (nombre) VALUES
('Usuario'),
('Editor'),
('Administrador');

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

INSERT INTO tags (nombre) VALUES
('Gerente'),
('Asesor'),
('Empleado'),
('Gestor'),
('Financiero');

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

CREATE TABLE perfiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    cc VARCHAR(20) UNIQUE,
    celular VARCHAR(20),
    foto_perfil VARCHAR(255),
    id_tag INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tags(id)
        ON DELETE SET NULL
);

CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    autor_id INT,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE,
    lugar VARCHAR(200),
    creado_por INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    asunto VARCHAR(200),
    mensaje TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE postulaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    archivo_cv VARCHAR(255),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre_archivo VARCHAR(255),
    ruta_archivo VARCHAR(255),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE encuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE respuestas_encuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encuesta_id INT,
    usuario_id INT,
    respuesta TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (encuesta_id) REFERENCES encuestas(id)
        ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(100),
    tabla_afectada VARCHAR(100),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

CREATE TABLE password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    token VARCHAR(255) NOT NULL,
    fecha_expiracion DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);

INSERT INTO usuarios (username,email,password_hash,id_rol) VALUES
('admin','admin@libero.com','hash123',3),
('editor','editor@libero.com','hash456',2),
('usuario','usuario@libero.com','hash789',1);

INSERT INTO perfiles (usuario_id,nombre,cc,celular,id_tag) VALUES
(1,'Administrador Sistema','100000001','300000001',1),
(2,'Editor Contenido','100000002','300000002',3),
(3,'Usuario General','100000003','300000003',2);

INSERT INTO noticias (titulo,contenido,autor_id) VALUES
('Inicio de operaciones','La empresa inicia nuevas actividades',1),
('Evento comunitario','Se realizará una jornada social',2);

INSERT INTO eventos (titulo,descripcion,fecha_evento,lugar,creado_por) VALUES
('Jornada ambiental','Actividad de limpieza comunitaria','2026-04-10','Putumayo',1);

INSERT INTO encuestas (pregunta) VALUES
('¿Cómo califica nuestro portal web?');

SHOW TABLES;

DESC perfiles;

SELECT 
usuarios.id,
usuarios.username,
roles.nombre AS rol
FROM usuarios
JOIN roles ON usuarios.id_rol = roles.id;
