import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import morgan from 'morgan';
import  Jwt  from 'jsonwebtoken';


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'empresa_proyec',
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
  
  

app.post('/Login', (peticion, respuesta) => {
  const sql = 'SELECT * from usuarios WHERE matricula = ? and contrasenia = ?'; 
  console.log (peticion.body);
  connection.query (sql, [peticion.body.matricula,peticion.body.contrasenia],(error,resultado) => {
    if(error) return respuesta.json({
      mensaje: 'error'
    });
    if(resultado.length > 0) {
      const usuarios = resultado [0];
      const token = Jwt.sign({usuario:'administrador'},'Raul',{expiresIn:'1d'});
      respuesta.setHeader('Set-Cookie',`token = ${token}`)
      return respuesta.json({
        status: 'correcto', 
        usuario: token
      });
      
    }else {
      return respuesta.json({status: 'error',error:'usuario y contraseña incorrectas'})
    }
  });
});

// Iniciar server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});