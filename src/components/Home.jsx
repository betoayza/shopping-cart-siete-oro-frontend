import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchingBarNotRegistered } from "./SearchingBarNotRegistered";
import logo from "../img/logo-siete-oro.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={"vh-100 w-100"}>
      <div className={"d-flex justify-content-end"}>
        <button
          className="btn btn-dark"
          onClick={() => navigate(`/contact/${0}/${0}`)}
        >
          <i
            className="bi-telephone-forward-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>

        <button className="btn btn-dark" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn btn-dark" onClick={() => navigate("/signup")}>
          Registrarse
        </button>
      </div>

      <div
        className={
          "d-grid justify-content-center align-content-space-around w-100 vh-100"
        }
      >
        <div className={"h-75"}>
          <img src={logo} style={{ width: 200, height: 200 }} alt="Logo" />
          <SearchingBarNotRegistered />
          <br />
          <br />
          <div className={"text-center"}>
            <h2 style={{ color: "green" }}>
              Bienvenido a nuestro carrito online!
            </h2>
            <p style={{ color: "brown" }}>
              El lugar donde encontrará los mejores panificados
            </p>
            <p style={{ color: "brown" }}>
              Utilice el buscador para encontrar sus productos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
