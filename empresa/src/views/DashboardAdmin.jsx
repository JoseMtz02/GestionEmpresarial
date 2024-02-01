import React from "react";
import NavAdmin from "../components/NavAdmin";
import VistaAdmin from "./VistaAdmin";
import Header from "../components/header";

function DashboardAdmin() {
  return (
    <>
   <Header></Header>
    <VistaAdmin></VistaAdmin>
      <NavAdmin></NavAdmin>
      

      
    </>
  );
}
export default DashboardAdmin;
