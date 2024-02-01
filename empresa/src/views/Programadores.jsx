import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";
import Header from "../components/header";

const TABLE_HEAD = ["Programador", "Proyecto", "Fecha de Inicio", "Estado del Proyecto", "Acciones"];

const Programadores = () => {

  const [programadores, setProgramadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Programadores')
      .then(response => {
        setProgramadores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los programadores', error);
      });
  }, []);

  // Función para manejar la eliminación de un programador
  const eliminarProgramador = (id) => {
    axios.delete(`http://localhost:8080/eliminarUsuario/${id}`)
      .then(() => {
        // Actualiza la lista de programadores para reflejar la eliminación
        setProgramadores(programadores.filter(programador => programador.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el programador', error);
      });
  };

  return (
    <>
      <Header />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 px-4 py-2">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {programadores.map((programador, index) => {
              const isLast = index === programadores.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.programador}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.proyecto}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(programador.fechaDeInicio).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.estadoDelProyecto}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {/* Acciones aquí */}
                    <button
                      type="button"
                      onClick={() => eliminarProgramador(programador.id)} // Asume que cada programador tiene un `id`
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Eliminar
                    </button>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>

  );
};
export default Programadores;