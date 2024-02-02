import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hacer la solicitud para obtener los datos de la base de datos
    axios
      .get("http://localhost:8080/obtenerUsuarios/")
      .then((response) => {
        setUsers(response.data); // Establecer los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Seguro de eliminar usuario ?")) {
      axios
        .delete(`http://localhost:8080/eliminarUsuario/${id}`)
        .then(() => {
          toast.success("Usuario eliminado!");
          // Filtrar los usuarios eliminados del estado actual
          setUsers((prevUsers) => prevUsers.filter((user) => user.id_usuario !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
        });
    }
  };

  return (
    <>
      <HeaderAdmin></HeaderAdmin>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="flex justify-center px-6 py-3">
                <Link to="/AgregarUsuarios">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Agregar Nuevo Usuario
                  </button>
                </Link>
              </th>
            </tr>
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Contraseña
              </th>
              <th scope="col" className="flex justify-center px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Iterar sobre los usuarios y crear una fila para cada uno */}
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4"></td>
                <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {user.nombre_usuario}
                </td>
                <td className="px-6 py-4">{user.rol_id}</td>
                <td className="px-6 py-4">{user.contrasenia}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-evenly space-x-2">
                    <Link to={`/EditUsuario/${user.id}`}>
                      <button
                        type="button"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Editar
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteContact(user.id_usuario)}
                      type="button"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Usuarios;
