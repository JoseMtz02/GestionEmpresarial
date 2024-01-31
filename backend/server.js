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
  });
  
  connection.connect((error) => {
    if (error) {
      console.log('No fue posible la conexión');
    } else {
      console.log('Conexión con el servidor exitosa');
    }
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
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});