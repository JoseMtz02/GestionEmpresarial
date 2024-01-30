/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Asignacion from './views/Asignacion';
import Equipos from './views/Equipos';
import Proyectos from './views/Proyectos';
import Contacto from './views/Contactanos';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Asignacion/>}></Route>
        <Route path='/Equipos' element={<Equipos/>}></Route>
        <Route path='/Proyectos' element={<Proyectos/>}></Route>
        <Route path='/Contactanos' element={<Contacto/>}></Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
