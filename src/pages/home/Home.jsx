import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchingBarNotRegistered } from "../../components/container/SearchingBarNotRegistered";
import logo from "../../img/logo-siete-oro.png";
import { SliderProductCards } from "../../components/container/SliderProductCards";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={"vh-100 w-100 border"}>
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
          "border border-success mt-5 d-grid justify-content-center align-content-space-around"
        }
        style={{ display: "grid", placeItems: "center" }}
      >
        <div
          className={"container border"}
          style={{ display: "grid", placeItems: "center" }}
        >
          <img src={logo} className={"img-fluid"} alt="Logo" />
          <SearchingBarNotRegistered />
          <br />
          <br />
          <div className={"text-center mt-5"}>
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
          <div           
            style={{ display: "grid", placeItems: "center", width: "200px" }}
          >
            <SliderProductCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
