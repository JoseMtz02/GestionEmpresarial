import React from "react";
import NavAdmin from "../components/NavAdmin";
import VistaAdmin from "./VistaAdmin";  
import HeaderAdmin from "../components/HeaderAdmin";

function DashboardAdmin() {
  return (
    <>
   <HeaderAdmin></HeaderAdmin>
    <VistaAdmin></VistaAdmin>
      <NavAdmin></NavAdmin>
      

      
    </>
  );
}
export default DashboardAdmin;
