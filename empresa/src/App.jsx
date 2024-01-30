/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Asignacion from './views/Asignacion';
<<<<<<< HEAD
import Equipos from './views/Equipos';
import Proyectos from './views/Proyectos';
import Contactanos from './views/Contactanos';
=======
>>>>>>> ff9a50cae9793aa445f38b0c846474e4e7235790

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Asignacion/>}></Route>
<<<<<<< HEAD
        <Route path='/Equipos' element={<Equipos/>}></Route>
        <Route path='/Proyectos' element={<Proyectos/>}></Route>
        <Route path='/Contactanos' element={<Contactanos/>}></Route>
       
=======
>>>>>>> ff9a50cae9793aa445f38b0c846474e4e7235790
      </Routes>
    </BrowserRouter>
  )
}

export default App
