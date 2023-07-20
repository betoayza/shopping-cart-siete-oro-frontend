import React from "react";
import { NavBarAdmin } from "./NavBarAdmin";
import logo from "../../img/logo-siete-oro.png";

const MainAdmin = () => {
  return (
    <div className={"vw-100 vh-100"}>
      <div className="">
        <NavBarAdmin />
      </div>
      <h2 className={"fw-bold"} style={{ color: "purple" }}>
        Bienvenido Admin!
      </h2>
      <div className={"h-75 d-grid align-content-center"}>
        <div>
          <img
            className="img-fluid"
            src={logo}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
