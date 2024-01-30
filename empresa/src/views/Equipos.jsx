import React from 'react';
import "../css/styles.css";
import "../css/normalize.css";
import diseñadores from "../img/diseñadores.jpg";
import analistas from "../img/analistas.webp";
import programadores from "../img/programadores.jpg";
import negocios from "../img/negocios.webp";
import prototipos from "../img/prototipos.webp";
import proyecto from "../img/proyecto3.jpg";
import Header from '../components/header';




function Equipos() {
    return (
      <>
      <Header></Header>
      <section class="seccion contenedor">
          <h1>Equipos</h1>
          <div class="contenedor-bloques">
            
              <div class="anuncio">
                  <img src={diseñadores} alt="analistas" />
                  <div class="contenido_anuncio">
                      <h3>Diseñadores</h3>    
                    
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>
  
            
              <div class="anuncio">
                  <img src={analistas} alt="diseñadores" />
                  <div class="contenido_anuncio">
                      <h3>Analistas</h3>
                      <p>
                      Temas sobre verb to be ingles I,II en adelante que se llegue a dificultar 
                  
                      </p>
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>
  
              <div class="anuncio">
                  <img src={programadores} alt="programadores" />
                  <div class="contenido_anuncio">
                      <h3>Programadores</h3>
                      <p>
              Temas a tratar como c# java python los cuales se veran mas adelante 
                      </p>
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>
  
             

              <div class="anuncio">
        
                  <img src={negocios} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>LogicLoom Projects</h3>
                      <p>
                          Cursos de ciberseguridad el cual consiste en el recuperamiento de datos seguridad en la informacion 
                      </p>
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>
  
           
              <div class="anuncio">
                  <img src={prototipos} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>TechVision Studio</h3>
                    
                     Temas a tratar de derivadas que se lleguen a presentar con el profe lylzon 
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>

              <div class="anuncio">
                  <img src={proyecto} alt="naranja1" />
                  <div class="contenido_anuncio">
                      <h3>DesignForge Collective</h3>
                      <p>
                        Temas de HTML para la creacion de paginas CSS que se lleguen a dificultar 
                      </p>
                      <a href="#" class="boton">Saber más...</a>
                  </div>
              </div>
          </div>
      </section>
      </>
    );
  };

export default Equipos;