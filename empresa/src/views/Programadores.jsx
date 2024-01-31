import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import Header from "../components/header";

const TABLE_HEAD = ["Programador", "Proyecto", "Fecha de Inicio", "Estado del Proyecto", "Acciones"];

const TABLE_ROWS = [
    {
      name: "John Michael",
      proyecto: "Manager",
      date: "23/04/18",
      status: "enable",
    },
    {
      name: "Alexa Liras",
      proyecto: "Developer",
      date: "23/04/18",
      status: "disable",
    },
    {
      name: "Laurent Perrier",
      proyecto: "Executive",
      date: "19/09/17",
      status: "progress",
    },
    {
      name: "Michael Levi",
      proyecto: "Developer",
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

function Programadores (){
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
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    View
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
export default Programadores;