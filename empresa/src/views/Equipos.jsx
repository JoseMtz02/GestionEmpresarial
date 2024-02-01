import React from 'react';
import "../css/styles.css";
import diseñadores from "../img/diseñadores.jpg";
import analistas from "../img/analistas.webp";
import programadores from "../img/programadores.jpg";
import negocios from "../img/negocios.webp";
import prototipos from "../img/prototipos.webp";
import proyecto from "../img/proyecto3.jpg";
import Header from '../components/header';
import { Link } from 'react-router-dom';



function Equipos() {
    return (
      <>
      <Header></Header>
      <section class="seccion contenedor">
          
          <div class="contenedor-bloques">
          
              <div class="anuncio">
              <Link to = "/Diseñadores">
                  <img src={diseñadores} alt="analistas" />
                  <div class="contenido_anuncio">
                      <h3>Diseñadores</h3> 
                  </div>
                  </Link>
              </div>
              
  
            
              <div class="anuncio">
              <Link to = "/Analistas">
                  <img src={analistas} alt="diseñadores" />
                  <div class="contenido_anuncio">
                      <h3>Analistas</h3>
                  </div>
                  </Link>
              </div>
  
              <div class="anuncio">
              <Link to = "/Programadores">
                  <img src={programadores} alt="programadores" />
                  <div class="contenido_anuncio">
                      <h3>Programadores</h3>
                  </div>
                  </Link>
              </div>
  
             

              <div class="anuncio">
              <Link to = "/Proyectos">
                  <img src={negocios} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>LogicLoom Projects</h3>
                      <p>
                          Cursos de ciberseguridad el cual consiste en el recuperamiento de datos seguridad en la informacion 
                      </p>
                     
                  </div>
                  </Link>
              </div>
  
           
              <div class="anuncio">
              <Link to = "/Proyectos">
                  <img src={prototipos} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>TechVision Studio</h3>
                      <p>
                     Temas a tratar de derivadas que se lleguen a presentar con el profe lylzon 
                     </p>
                  </div>
                  </Link>
              </div>

              <div class="anuncio">
              <Link to = "/Proyectos">
                  <img src={proyecto} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>DesignForge Collective</h3>
                      <p>
                        Temas de HTML para la creacion de paginas CSS que se lleguen a dificultar 
                      </p>
                      
                  </div>
                  </Link>
              </div>
              
          </div>
      </section>
      </>
    );
  };

export default Equipos;