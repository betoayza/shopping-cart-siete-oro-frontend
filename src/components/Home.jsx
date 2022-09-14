import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div id="login-reg-div">
        <button className="btn btn-dark" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn btn-dark" onClick={() => navigate("/signup")}>
          Registrarse
        </button>
      </div>

      
      <h2>Bienvenido a nuestro carrito online!</h2>
      <p>El lugar donde encontrará los mejores panificados</p>
      <p>Utilice el buscador para encontrar sus productos</p>
      <p>Aca van algunas imagenes</p>
    </div>
  );
};

export default Home;
