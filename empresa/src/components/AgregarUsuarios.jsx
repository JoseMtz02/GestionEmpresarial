import React from "react";
import HeaderAdmin from "./HeaderAdmin";

function AgregarUsuarios(){
    return (
        <>
        <HeaderAdmin> </HeaderAdmin>  
        
        <form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label
      htmlFor="email"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Nombre de Usuario
    </label>
    <input
      type="text"
      id="user"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      placeholder="User#"
      required=""
    />
  </div>
  <div className="mb-5">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Contraseña
    </label>
    <input
      type="password"
      id="password"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required=""
    />
  </div>
  <div className="mb-5">
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eliga el rango</label>
<select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Seleccione</option>
  <option value="ADM">Administrador</option>
  <option value="LID">Lider</option>
  <option value="USR">Usuario</option>
</select>
   
  </div>
  
  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Guardar
  </button>
</form>


        </>
    );
};
export default AgregarUsuarios;