import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { Link } from "react-router-dom";

function Usuarios() {
  return (
    <>
      <HeaderAdmin></HeaderAdmin>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="flex justify-center px-6 py-3">
                <Link to="/AgregarUsuarios">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Agregar Nuevo Usuario
                  </button>{" "}
                </Link>
              </th>
            </tr>
            <tr>
              <th scope="col" class="p-4"></th>
              <th scope="col" class="px-6 py-3">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                Rol
              </th>
              <th scope="col" class="px-6 py-3">
                Contraseña
              </th>
              <th scope="col" class="flex justify-center px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4"></td>
              <th
                scope="row"
                class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              ></th>
              <td class="px-6 py-4"></td>
              <td class="px-6 py-4"></td>
              <td class="px-6 py-4">
                <div class="flex justify-evenly space-x-2">
                  <Link to = "/EditUsuario">
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  </Link>
                  <button
                    type="button"
                    data-modal-show="deleteUserModal"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Usuarios;
