import React from 'react';
import Header from "../components/header";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Tipo de Recurso", "Recurso", "Asignado a Proyecto", "Estado del Proyecto", "Disponibilidad", "Acciones"];

const TABLE_ROWS = [
    {
      tipo: "Económico",
      recurso: "Fondos",
      asignado: "SI",
      status: "enable",
      disponibilidad: 1,
    },
    {
        tipo: "Económico",
        recurso: "Fondos",
        asignado: "SI",
        status: "enable",
        disponibilidad: 1,
      }, 
      {
      tipo: "Económico",
      recurso: "Fondos",
      asignado: "SI",
      status: "enable",
      disponibilidad: 1,
    },
    {
        tipo: "Económico",
        recurso: "Fondos",
        asignado: "SI",
        status: "enable",
        disponibilidad: 1,
      },
  ];

function Recursos () {
    return(
    <>
    <Header></Header>
    
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ tipo, recurso, asignado, status, disponibilidad, accion }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={tipo}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {tipo}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {recurso}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {asignado}
                  </Typography>
                </td>
                <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {status}
                  </Typography>
                </td>
                <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {disponibilidad}
                  </Typography>
                </td>
                <td className={classes}>
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Editar
                  </Typography>

                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Eliminar
                  </Typography>
                  
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Agregar
                  </Typography>
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

export default Recursos;