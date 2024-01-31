/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Asignacion from './views/Asignacion';
import Equipos from './views/Equipos';
import Proyectos from './views/Proyectos';
import Contactanos from './views/Contactanos';
import Programadores from './views/Programadores';
import Analistas from './views/Analistas';
import Diseñadores from './views/Diseñadores';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Asignacion/>}></Route>
        <Route path='/Equipos' element={<Equipos/>}></Route>
        <Route path='/Proyectos' element={<Proyectos/>}></Route>
        <Route path='/Contactanos' element={<Contactanos/>}></Route>
        <Route path='/Programadores' element={<Programadores/>}></Route>
        <Route path='/Analistas' element={<Analistas/>}></Route>
        <Route path='/Diseñadores' element={<Diseñadores/>}></Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
