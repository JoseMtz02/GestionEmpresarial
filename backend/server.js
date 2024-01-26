import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion',
  });
  
  connection.connect((error) => {
    if (error) {
      console.log('No fue posible la conexión');
    } else {
      console.log('Conexión con el servidor exitosa');
    }
  });

// Iniciar server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});