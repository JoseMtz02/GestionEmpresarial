import React from "react";
import ImgProyectos from '../assets/proyectos.jpg';
import ImgEquipos from '../assets/equipos.jpg';
import ImgRecursos from '../assets/recursos.png';
import "../css/styles.css";
import { Link } from "react-router-dom";

function VistaAdmin(){
    return(
        <>
        
        <div class="flex justify-end items-center h-screen ">

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4 text-center">
        <Link to = "/Equipos"> 
        <img class="rounded-t-lg" src={ImgEquipos} alt="" />
   
    <div class="p-5">
        
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Equipos</h5>
        
            
    </div>
    </Link>
</div>


<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4 text-center">
   <Link to = "/Proyectos">
        <img class="rounded-t-lg" src={ImgProyectos} alt="" />
    
    <div class="p-5">
        
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Proyectos</h5>
        
        
    </div>
    </Link>
</div>


<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-4 text-center">
    <Link to = "/Recursos">
        <img class="rounded-t-lg" src={ImgRecursos} alt="" />
   
    <div class="p-5">
        
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Recursos</h5>
        
        
    </div>
    </Link>
</div>

</div>



        </>
    );
};
export default VistaAdmin;