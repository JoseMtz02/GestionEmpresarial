import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from "@material-tailwind/react";
import Header from "../components/header";

const TABLE_HEAD = ["Programador", "Proyecto", "Fecha de Inicio", "Estado del Proyecto", "Acciones"];

const Programadores = () => {
  const [programadores, setProgramadores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProgramador, setCurrentProgramador] = useState({
    id: '',
    nombre_usuario: '',
    contrasenia: '',
    rol: ''
  });

  useEffect(() => {
    const fetchProgramadores = () => {
      axios.get('http://localhost:8080/Programadores')
        .then(response => {
          setProgramadores(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos de los programadores', error);
        });
    };

    fetchProgramadores();
    const intervalId = setInterval(fetchProgramadores, 60000); // Actualiza cada 60 segundos

    return () => clearInterval(intervalId); // Limpieza al desmontar el componente
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgramador(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8080/editarUsuario/${currentProgramador.id}`, currentProgramador)
      .then(() => {
        setIsModalOpen(false);
        setCurrentProgramador({ id: '', nombre_usuario: '', contrasenia: '', rol: '' }); // Reset form
        setProgramadores([]); // Reset programadores to force re-fetch
      })
      .catch(error => {
        console.error('Error al editar el programador', error);
      });
  };

  const abrirModalParaEditar = (programador) => {
    setCurrentProgramador({
      id: programador.id,
      nombre_usuario: programador.nombre_usuario,
      contrasenia: '', // La contraseña no se debe pre-cargar
      rol: programador.rol
    });
    setIsModalOpen(true);
  };

  const eliminarProgramador = (id) => {
    axios.delete(`http://localhost:8080/eliminarUsuario/${id}`)
      .then(() => {
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
              {programadores.map((programador, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.programador}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.proyecto}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(programador.fechaDeInicio).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {programador.estadoDelProyecto}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      type="button"
                      onClick={() => eliminarProgramador(programador.id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Eliminar
                    </button>
                    <button
                      type="button"
                      onClick={() => abrirModalParaEditar(programador)}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <form onSubmit={handleFormSubmit}>
                <div>
                  <label>Nombre de Usuario:</label>
                  <input
                    type="text"
                    name="nombre_usuario"
                    value={currentProgramador?.nombre_usuario || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    name="contrasenia"
                    value={currentProgramador?.contrasenia || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Rol:</label>
                  <select
                    name="rol"
                    value={currentProgramador?.rol || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un Rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Líder">Líder</option>
                    <option value="Miembro">Miembro</option>
                  </select>
                </div>
                <button type="submit" className="submit-button">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Programadores;