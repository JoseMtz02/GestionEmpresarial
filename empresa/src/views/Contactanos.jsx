import React from "react";
import Header from "../components/header";

function Contactanos(){
    return (
<>
<Header></Header>
<div className="content">
  <h1 className="logo-agenda">
    {" "}
    Contáctanos<span> ahora</span>
  </h1>
  <div className="agenda-wrapper">
    <div className="agenda-form">
      <h3>Llena todos los campos</h3>
      <form action="">
       
        
        <p className="block">
          <label>Mensaje</label>
          <textarea name="mensaje" rows={10} defaultValue={""} />
        </p>
        <p className="block">
          <button type="submit">Enviar</button>
        </p>
      </form>
    </div>
    <div className="agenda-info">
      <h4>Más información </h4>
      <ul>
        <li>
          {" "}
          <i className="fa-solid fa-location-dot" /> UT-Cancún
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-phone" /> 
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-envelope" />
          
        </li>
      </ul>
      <p>
        Realiza tu consulta sin un intermediario. Te haremos llegar un correo para
        confirmar.
      </p>
      <p> </p>
    </div>
  </div>
</div>

    </>
    );
};

export default Contactanos;