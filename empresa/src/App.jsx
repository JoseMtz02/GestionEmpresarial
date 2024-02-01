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
import LoginComponent from './views/Login';
import AgregarUsuarios from './components/AgregarUsuarios';
import Bread from './components/Bread';
import AssigSideTable from './components/AssigSideTable';
import ModalCrud from './components/ModalCrud';
import CardComentUser from './components/CardComentUser';
import Recursos from './views/Recursos';
import DashboardAdmin from './views/DashboardAdmin';
import NavAdmin from './components/NavAdmin';
import HeaderAdmin from './components/HeaderAdmin';
import Usuarios from './views/Usuarios';

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
        <Route path='/Login' element={<LoginComponent/>}></Route>
        <Route path='/AgregarUsuarios' element={<AgregarUsuarios/>}></Route>
        <Route path='/Bread' element={<Bread/>}></Route>
        <Route path='/Asignacion' element={<AssigSideTable/>}></Route>
        <Route path='/ModalCrud' element={<ModalCrud/>}></Route>
        <Route path='/CardComentUser' element={<CardComentUser/>}></Route>
        <Route path='/Dashboard' element={<DashboardAdmin/>}></Route>
        <Route path='/Recursos' element={<Recursos/>}></Route>
        <Route path='/NavAdmin' element={<NavAdmin/>}></Route>
        <Route path='/VistaAdmin' element={<NavAdmin/>}></Route>
        <Route path='/HeaderAdmin' element={<HeaderAdmin/>}></Route>
        <Route path='/Usuarios' element={<Usuarios/>}></Route>
        
       
        
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
