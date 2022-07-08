import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MainUser = () => {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();
  let location = useLocation();
  const userData = location.state.userData;
  console.log(userData);

  const handleChange = (e) => {
    setChoice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (choice) {
      case "1":
        navigate("/user/profile", { state: { userData } });
        break;
      case "2":
        const code = userData.code;
        navigate("/user/shopping-cart", { state: { code } });
        break;
      case "3":
        navigate("/user/orders");
        break;
      case "4":
        navigate("/user/orders/code");
        break;
      default:
        navigate("/user");
        break;
    }
  };

  return (
    <>
      <h2>Elija su opción:</h2>

      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <select
            className="form-select"
            aria-label="Default select example"
            value={choice}
            onChange={handleChange}
          >
            <option value="0">Seleccione</option>
            <option value="1">Mis Datos</option>
            <option value="2">Carrito</option>
            <option value="3">Todos Pedidos</option>
            <option value="4">Buscar pedido</option>
          </select>

          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Elegir
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MainUser;
