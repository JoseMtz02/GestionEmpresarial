DROP DATABASE IF EXISTS empresa_proyec;

CREATE DATABASE empresa_proyec;
USE empresa_proyec;

-- Creación de tablas principales
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

CREATE TABLE equipos (
  id_equipo INT PRIMARY KEY AUTO_INCREMENT,
  nombre_equipo VARCHAR(255) UNIQUE NOT NULL,
  descripcion TEXT
);

CREATE TABLE miembros_equipo (
  id_miembro INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_equipo INT,
  especialidad ENUM('Programador', 'Diseñador', 'Analista') NOT NULL,
  carga_trabajo INT NULL,
  FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

CREATE TABLE asignaciones (
  id_asignacion INT PRIMARY KEY AUTO_INCREMENT,
  id_proyecto INT,
  id_miembro INT,
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
  FOREIGN KEY (id_miembro) REFERENCES miembros_equipo(id_miembro)
);

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

CREATE TABLE roles (
  id_rol INT PRIMARY KEY AUTO_INCREMENT,
  nombre_rol VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre_usuario VARCHAR(100) NOT NULL,
  contrasenia VARCHAR(255) NOT NULL,
  rol_id INT,
  matricula VARCHAR(255) UNIQUE,
  FOREIGN KEY (rol_id) REFERENCES roles(id_rol)
);

INSERT INTO roles (nombre_rol) VALUES ('Administrador'), ('Líder'), ('Miembro');

CREATE TABLE lideres_equipos (
  id_lider_equipo INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_equipo INT,
  especialidad ENUM('Programador', 'Diseñador', 'Analista'),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

CREATE TABLE ediciones_miembros (
  id_edicion INT PRIMARY KEY AUTO_INCREMENT,
  id_lider INT,
  id_miembro_editado INT,
  detalle_cambio TEXT,
  fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_lider) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_miembro_editado) REFERENCES miembros_equipo(id_miembro)
);

CREATE TABLE cambios_proyectos (
  id_cambio INT PRIMARY KEY AUTO_INCREMENT,
  id_admin INT,
  id_proyecto INT,
  tipo_cambio ENUM('Edición', 'Eliminación'),
  motivo TEXT,
  fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_admin) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Creación de la tabla auxiliar para la secuencia de matrícula
CREATE TABLE secuencia_matricula (
  id INT PRIMARY KEY AUTO_INCREMENT,
  siguiente_matricula INT NOT NULL
);

-- Inicialización de la tabla auxiliar con el primer valor de matrícula
INSERT INTO secuencia_matricula (siguiente_matricula) VALUES (1);  -- Comienza con 1

-- Ajuste del trigger para calcular la matrícula usando la tabla auxiliar
DELIMITER $$
CREATE TRIGGER before_usuario_insert
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
  DECLARE next_val INT;
  SELECT siguiente_matricula INTO next_val FROM secuencia_matricula ORDER BY id DESC LIMIT 1;
  SET NEW.matricula = CONCAT('2239', next_val);
  UPDATE secuencia_matricula SET siguiente_matricula = siguiente_matricula + 1 ORDER BY id DESC LIMIT 1;
END$$
DELIMITER ;