import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchingBarNotRegistered } from "./SearchingBarNotRegistered";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={"vh-100 w-100 border"}>
      <div id={"login-reg-div"} className={""}>
        <button className="btn btn-dark" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn btn-dark" onClick={() => navigate("/signup")}>
          Registrarse
        </button>
      </div>

      <div className={"d-grid align-items-stretch w-100 h-100 "}>
        <div className={""}>
          <SearchingBarNotRegistered />
          <h2>Bienvenido a nuestro carrito online!</h2>
          <p>El lugar donde encontrará los mejores panificados</p>
          <p>Utilice el buscador para encontrar sus productos</p>
          <p>Aca van algunas imagenes</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
