import React from "react";
import { NavBarAdmin } from "./NavBarAdmin";
import logo from "../img/logo-siete-oro.png";

const MainAdmin = () => {
  return (
    <div className={"vw-100 vh-100"}>
      <NavBarAdmin />
      <h2 style={{ color: "purple" }}>Bienvenido Admin!</h2>
      <div className={"h-75 d-grid align-content-center"}>
        <div>
          <img src={logo} style={{ width: 200, height: 200 }} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
