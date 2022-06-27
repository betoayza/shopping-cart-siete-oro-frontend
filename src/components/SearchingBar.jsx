//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchingBar = () => {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //para que no se refresque la pagina
    try {
      console.log("Es producto enviado es: ", product);
      const result = await axios.get("/products-founded", {
        params: { name: product },
      });
      let data = result.data;
      console.log("Resultado del await: ", data);
      navigate("/products-founded", { state: { data } });
    } catch (error) {
      console.error(error);
    }
  };

  //Only controls typing
  const handleChange = (e) => {
    setProduct(e.target.value);
    console.log("Tipeado: ", e.target.value); //se imprime el e.target.value, no el state
    //e.preventDefault();
  };

  return (
    <>
      <div className="text-center border searching-bar-div"> 
        <div id="login-reg-div">
          <button className="btn btn-dark" onClick={()=>navigate('/login')}>Login</button>
          <button className="btn btn-dark" onClick={()=>navigate('/signup')}>Registrarse</button>        
        </div>       
        <h1>Panadería Siete de Oro</h1>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row ">
            <div className="col-md-9">
                <input
                  className="form-control"
                  name="producto"
                  value={product}
                  placeholder="¿Qué está buscando?..."
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="btn btn-success fas fa-paper-plane"
                  type="submit"
                  value="Enviar"
                />
              </div>
            </div>
          </form>
        </div>
        <br />
      </div>
    </>
  );
};

export default SearchingBar;
