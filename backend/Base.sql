CREATE DATABASE empresa_proyec;
USE empresa_proyec;

-- Tabla de proyectos con historial de cambios en el estado
CREATE TABLE proyectos (
  id_proyecto INT PRIMARY KEY AUTO_INCREMENT,
  nombre_proyecto VARCHAR(255) UNIQUE NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE NOT NULL,
  estado ENUM('En Curso', 'Completado', 'Pendiente') DEFAULT 'Pendiente'
);

CREATE TABLE historial_proyecto (
  id_historial INT PRIMARY KEY AUTO_INCREMENT,
  id_proyecto INT,
  estado_anterior ENUM('En Curso', 'Completado', 'Pendiente'),
  estado_nuevo ENUM('En Curso', 'Completado', 'Pendiente'),
  fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Tabla de equipos
CREATE TABLE equipos (
  id_equipo INT PRIMARY KEY AUTO_INCREMENT,
  nombre_equipo VARCHAR(255) UNIQUE NOT NULL,
  descripcion TEXT
);

-- Tabla de miembros del equipo
CREATE TABLE miembros_equipo (
  id_miembro INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_equipo INT,
  especialidad ENUM('Programador', 'Diseñador', 'Analista') NOT NULL,
  carga_trabajo INT NULL,
  FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

-- Tabla de asignaciones
CREATE TABLE asignaciones (
  id_asignacion INT PRIMARY KEY AUTO_INCREMENT,
  id_proyecto INT,
  id_miembro INT,
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
  FOREIGN KEY (id_miembro) REFERENCES miembros_equipo(id_miembro)
);

-- Tabla de recursos consolidada
CREATE TABLE recursos (
  id_recurso INT PRIMARY KEY AUTO_INCREMENT,
  id_proyecto INT,
  nombre_recurso VARCHAR(255) NOT NULL,
  tipo ENUM('Humano', 'Material') NOT NULL,
  especialidad_tipo VARCHAR(100),
  cantidad INT,
  disponibilidad INT,
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Tabla de usuarios
CREATE TABLE usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(100) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  id_rol INT,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Tabla de roles
CREATE TABLE roles (
  id_rol INT PRIMARY KEY AUTO_INCREMENT,
  nombre_rol VARCHAR(100) UNIQUE NOT NULL
);

-- Inserción de roles predeterminados
INSERT INTO roles (nombre_rol) VALUES ('Administrador'), ('Líder'), ('Miembro');

-- Tabla de relación entre líderes y equipos para múltiples líderes
CREATE TABLE lideres_equipos (
  id_lider_equipo INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_equipo INT,
  especialidad ENUM('Programador', 'Diseñador', 'Analista'),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

-- Tabla para rastrear ediciones de miembros del equipo por líderes
CREATE TABLE ediciones_miembros (
  id_edicion INT PRIMARY KEY AUTO_INCREMENT,
  id_lider INT,
  id_miembro_editado INT,
  detalle_cambio TEXT,
  fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_lider) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_miembro_editado) REFERENCES miembros_equipo(id_miembro)
);