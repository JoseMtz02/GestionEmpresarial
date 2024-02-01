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

CREATE TABLE miembros_equipo (
  id_miembro INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_equipo INT,
  id_usuario INT, 
  especialidad ENUM('Programador', 'Diseñador', 'Analista') NOT NULL,
  carga_trabajo INT NULL,
  FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
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

INSERT INTO roles (nombre_rol) VALUES ('Administrador'), ('Líder'), ('Miembro');

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
  SET NEW.matricula = CONCAT('2239', LPAD(next_val, 1, '0'));
  UPDATE secuencia_matricula SET siguiente_matricula = siguiente_matricula + 1 ORDER BY id DESC LIMIT 1;
END$$
DELIMITER ;

INSERT INTO usuarios (nombre_usuario, contrasenia, rol_id) VALUES 
('Guillermo', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Administrador')),
('Alisson', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Líder')),
('Raúl', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro')),
('Benito', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro')),
('José', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro'));

INSERT INTO proyectos (nombre_proyecto, descripcion, fecha_inicio, estado) VALUES 
('Proyecto Alfa', 'Este es el primer proyecto importante de la empresa, con un enfoque en desarrollo de software.', '2023-01-01', 'En Curso'),
('Proyecto Beta', 'Este es el segundo proyecto importante, con un enfoque en investigación y desarrollo.', '2023-02-01', 'Pendiente');

INSERT INTO equipos (nombre_equipo, descripcion) VALUES 
('Equipo Desarrollo 1', 'Equipo dedicado al desarrollo de software'),
('Equipo Desarrollo 2', 'Equipo dedicado al desarrollo de nuevos proyectos');

INSERT INTO miembros_equipo (nombre, id_equipo, id_usuario, especialidad) VALUES 
('Guillermo', 1, 1, 'Programador'),
('Alisson', 1, 2, 'Programador'),
('Raúl', 2, 3, 'Programador'),
('Benito', 2, 4, 'Programador'),
('José', 2, 5, 'Programador');

INSERT INTO asignaciones (id_proyecto, id_miembro) VALUES 
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 1),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Beta'), 2),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 3),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Beta'), 4),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 5);

SELECT * FROM miembros_equipo;
SELECT * FROM asignaciones;
SELECT * FROM proyectos;