import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";
import Header from "../components/header";

const TABLE_HEAD = ["Programador", "Proyecto", "Fecha de Inicio", "Estado del Proyecto", "Acciones"];

const Programadores = () => {

  const [programadores, setProgramadores] = useState([]); // Estado para almacenar los datos de los programadores

  useEffect(() => {
    // Realiza la solicitud al cargar el componente
    axios.get('http://localhost:8080/Programadores')
      .then(response => {
        // Actualiza el estado con los datos recibidos
        setProgramadores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de los programadores', error);
      });
  }, []);

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