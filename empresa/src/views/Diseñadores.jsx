import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import Header from "../components/header";

const TABLE_HEAD = ["Diseñador", "Proyecto", "Fecha de Inicio", "Estado del Proyecto", "Acciones"];

const TABLE_ROWS = [
    {
      name: "John Krieg",
      proyecto: "Figma Login",
      date: "23/04/18",
      status: "enable",
    },
    {
      name: "Fernanda Liras",
      proyecto: "Animaciones de video",
      date: "23/04/18",
      status: "disable",
    },
    {
      name: "Laurent Pets",
      proyecto: "Css y tailwind",
      date: "19/09/17",
      status: "progress",
    },
    {
      name: "Manuel Levi",
      proyecto: "Android",
      date: "24/12/08",
      status: "disable",
    },
    {
      name: "Richard Gran",
      proyecto: "Manager",
      date: "04/10/21",
      status: "enable",
    },
  ];

function Diseñadores (){
    return (
        <>
        <Header> </Header>

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
          {TABLE_ROWS.map(({ name, proyecto, date, status, accion }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {proyecto}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
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
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Delete
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
export default Diseñadores;