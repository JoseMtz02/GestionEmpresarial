import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa_proyec',
  });
  
  connection.connect((error) => {
    if (error) {
      console.log('No fue posible la conexión');
    } else {
      console.log('Conexión con el servidor exitosa');
    }
  });

// Ruta para obtener todos los usuarios
app.get('/obtenerUsuarios', (peticion, respuesta) => {
  // Consulta SQL para seleccionar toda la información de los usuarios
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (error, resultados) => {
    if (error) {
      console.error("Error al obtener los usuarios:", error.message);
      return respuesta.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }

    // Envía la lista de usuarios como respuesta
    return respuesta.json(resultados);
  });
});

  // Registrar usuarios
  app.post('/registrarUsuario', (peticion, respuesta) => {
    // Asume que el rol se envía como parte de la petición, por ejemplo, "Administrador", "Líder", "Miembro"
    const { nombre_usuario, contrasenia, rol } = peticion.body;
  
    // Validar que todos los campos requeridos estén presentes
    if (!nombre_usuario || !contrasenia || !rol) {
      return respuesta.status(400).json({ mensaje: "Todos los campos son requeridos." });
    }
  
    // Buscar el id_rol basado en el nombre del rol enviado
    const sqlBuscarRol = "SELECT id_rol FROM roles WHERE nombre_rol = ?";
    connection.query(sqlBuscarRol, [rol], (error, resultados) => {
      if (error || resultados.length === 0) {
        console.error("Error buscando el rol o rol no encontrado:", error?.message);
        return respuesta.status(500).json({ mensaje: "Rol no válido o error en el servidor." });
      }
  
      const id_rol = resultados[0].id_rol;
  
      // Generar el hash de la contraseña
      const hash = bcrypt.hashSync(contrasenia, 10);
  
      // Insertar el nuevo usuario con el rol correspondiente
      const sqlInsertarUsuario = "INSERT INTO usuarios (nombre_usuario, contrasenia, rol_id) VALUES (?, ?, ?)";
      connection.query(sqlInsertarUsuario, [nombre_usuario, hash, id_rol], (error, resultado) => {
        if (error) {
          console.error("Error en la consulta:", error.message);
          return respuesta.status(500).json({ mensaje: "Hubo un error en el servidor. Inténtalo de nuevo más tarde." });
        }
        respuesta.json({ Estatus: "CORRECTO" });
      });
    });
  });
 
  app.delete('/eliminarUsuario/:id', (peticion, respuesta) => {
    const id = peticion.params.id; // Accede al ID desde params, no desde el cuerpo de la solicitud

    console.log(`Intentando eliminar usuario con ID: ${id}`); // Log para depuración

    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    connection.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error("Error al eliminar el usuario:", error);
            return respuesta.status(500).json({ mensaje: 'Error al eliminar usuario' });
        }

        if (resultado.affectedRows > 0) {
            return respuesta.json({ Estatus: 'CORRECTO', Mensaje: 'Usuario eliminado correctamente' });
        } else {
            return respuesta.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    });
});

// Editar usuarios
app.patch('/editarUsuario/:id', (peticion, respuesta) => {
  const { id } = peticion.params; // Captura el ID del usuario desde el parámetro de la ruta
  const { nombre_usuario, contrasenia, rol } = peticion.body; // Asume que estos campos pueden ser actualizados

  // Validar que todos los campos requeridos estén presentes
  if (!nombre_usuario || !contrasenia || !rol) {
    return respuesta.status(400).json({ mensaje: "Todos los campos son requeridos para la actualización." });
  }

  // Buscar el id_rol basado en el nombre del rol enviado
  const sqlBuscarRol = "SELECT id_rol FROM roles WHERE nombre_rol = ?";
  connection.query(sqlBuscarRol, [rol], (error, resultados) => {
    if (error || resultados.length === 0) {
      console.error("Error buscando el rol o rol no encontrado:", error?.message);
      return respuesta.status(500).json({ mensaje: "Rol no válido o error en el servidor." });
    }

    const id_rol = resultados[0].id_rol;

    // Generar el hash de la contraseña
    const hash = bcrypt.hashSync(contrasenia, 10);

    // Actualizar el usuario con el nuevo nombre, contraseña hasheada y rol correspondiente
    const sqlActualizarUsuario = "UPDATE usuarios SET nombre_usuario = ?, contrasenia = ?, rol_id = ? WHERE id_usuario = ?";
    connection.query(sqlActualizarUsuario, [nombre_usuario, hash, id_rol, id], (error, resultado) => {
      if (error) {
        console.error("Error en la consulta:", error.message);
        return respuesta.status(500).json({ mensaje: "Hubo un error en el servidor al intentar actualizar el usuario. Inténtalo de nuevo más tarde." });
      }

      if (resultado.affectedRows > 0) {
        return respuesta.json({ Estatus: "CORRECTO", Mensaje: "Usuario actualizado correctamente" });
      } else {
        // Si no se encontró el usuario o no se actualizó ninguna fila
        return respuesta.status(404).json({ mensaje: 'Usuario no encontrado o datos no modificados' });
      }
    });
  });
});
  
app.post('/Login', (req, res) => {
  try {
  const matricula = req.body.matricula;
  const contrasenia = req.body.contrasenia;
  const sql = 'SELECT id_usuario, rol_id FROM users WHERE matricula = ? and contrasenia = ?';

  connection.query(sql, [matricula, contrasenia], async (error, results) => {
    if(error) {
      console.error('Query Error', error);
      return res.status(500).json({ Error: 'Query Error'});
    }

    if(results && results.length > 0){
      const user = results[0];
        const token = jwt.sign({
          id: user.id_usuario,
          rol: user.rol_id
        }, 'SECRET');
        console.log(`User: ${user.id_usuario} login has been successful`);
        return res.json({ Status: 'correcto', token});
    } else {
      console.log('Login Failed due to incorrect credentials');
      return res.json({ Status: 'Error', Message: 'El email o la matricula son incorrectas'});
    }
  })
  } catch(err){
    console.error('Error Innesperado', err);
    res.status(500).json({ Error: 'Error Innesperado'});
  }
});

//Obtenemos los datos de programadores para luego mapear en la view "Programadores.jsx"

app.get('/Programadores', (req, res) => {
  const sql = `
    SELECT 
      me.nombre AS programador, 
      p.nombre_proyecto AS proyecto, 
      p.fecha_inicio AS fechaDeInicio, 
      p.estado AS estadoDelProyecto 
    FROM 
      miembros_equipo me
    JOIN 
      asignaciones a ON me.id_miembro = a.id_miembro
    JOIN 
      proyectos p ON a.id_proyecto = p.id_proyecto
    WHERE 
      me.especialidad = 'Programador';
  `;

  connection.query(sql, (error, resultados) => {
    if (error) {
      // Maneja cualquier error que ocurra durante la consulta
      console.error("Error en la consulta:", error.message);
      return res.status(500).json({ mensaje: 'Error al obtener los programadores' });
    }

    // Envía los resultados de la consulta al cliente
    res.json(resultados);
  });
});

// Iniciar server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
