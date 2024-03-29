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

-- Iniciamos la inserción de datos --

USE empresa_proyec;

-- Crear equipos
INSERT INTO equipos (nombre_equipo, descripcion) VALUES 
('Equipo Desarrollo 1', 'Equipo dedicado al desarrollo de software'),
('Equipo Desarrollo 2', 'Equipo dedicado al desarrollo de nuevos proyectos');

-- Crear proyectos
INSERT INTO proyectos (nombre_proyecto, descripcion, fecha_inicio, estado) VALUES 
('Proyecto Alfa', 'Primer proyecto importante', '2022-01-01', 'En Curso'),
('Proyecto Beta', 'Segundo proyecto importante', '2022-02-01', 'Pendiente');

-- Insertar usuarios, incluyendo el Administrador y la Líder que son programadores
INSERT INTO usuarios (nombre_usuario, contrasenia, rol_id) VALUES 
('Guillermo', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Administrador')),
('Alisson', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Líder')),
('Raúl', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro')),
('Benito', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro')),
('José', '$2b$10$suyd4N31tMji7subuKL0e.UQBazelb.9vLHsjarvfWQX2QpUHyvW2', (SELECT id_rol FROM roles WHERE nombre_rol = 'Miembro'));

-- Insertar miembros del equipo
INSERT INTO miembros_equipo (nombre, id_equipo, especialidad) VALUES 
('Guillermo', 1, 'Programador'),
('Alisson', 1, 'Programador'),
('Raúl', 2, 'Programador'),
('Benito', 2, 'Programador'),
('José', 2, 'Programador');

-- Asignar miembros del equipo a proyectos
INSERT INTO asignaciones (id_proyecto, id_miembro) VALUES 
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 1),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Beta'), 2),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 3),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Beta'), 4),
((SELECT id_proyecto FROM proyectos WHERE nombre_proyecto = 'Proyecto Alfa'), 5);

SELECT * FROM miembros_equipo;
SELECT * FROM asignaciones;
SELECT * FROM proyectos;

CREATE TABLE ProgramadoresAux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    proyecto VARCHAR(255),
    fechaDeInicio DATE,
    estadoDelProyecto VARCHAR(50)
);

DELIMITER $$

CREATE TRIGGER AfterInsertProgramador
AFTER INSERT ON miembros_equipo
FOR EACH ROW
BEGIN
    IF NEW.especialidad = 'Programador' THEN
        INSERT INTO ProgramadoresAux (nombre, proyecto, fechaDeInicio, estadoDelProyecto)
        SELECT NEW.nombre, p.nombre_proyecto, p.fecha_inicio, p.estado
        FROM asignaciones a
        JOIN proyectos p ON a.id_proyecto = p.id_proyecto
        WHERE a.id_miembro = NEW.id_miembro;
    END IF;
END$$

DELIMITER ;
