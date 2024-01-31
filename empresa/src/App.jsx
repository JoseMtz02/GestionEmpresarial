/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Asignacion from './views/Asignacion';
import Equipos from './views/Equipos';
import Proyectos from './views/Proyectos';
import Contactanos from './views/Contactanos';
import LoginComponent from './views/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Asignacion/>}></Route>
        <Route path='/Equipos' element={<Equipos/>}></Route>
        <Route path='/Proyectos' element={<Proyectos/>}></Route>
        <Route path='/Contactanos' element={<Contactanos/>}></Route>
        <Route path='/Login' element={<LoginComponent/>}></Route>
        
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
