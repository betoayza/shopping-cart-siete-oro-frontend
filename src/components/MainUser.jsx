import React, { useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { UserProfile } from "./indexComponents";

const MainUser = () => {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { code } = params;

  console.log(code);

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
    <div>
      <h2>Elija su opción:</h2>
      {/* la que va */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Menu
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/">
                  {({ isActive }) => (
                    <p
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
                    >
                      Home
                    </p>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/user/profile/${code}`}>
                  {({ isActive }) => (
                    <p className={isActive ? "nav-link" : "nav-link"}>
                      Mi perfil
                    </p>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  {({ isActive }) => (
                    <p className={isActive ? "nav-link" : "nav-link"}>
                      Mi carrito
                    </p>
                  )}
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pedidos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={`/user/orders/${code}`}>
                      {({ isActive }) => (
                        <p
                          className={
                            isActive ? "dropdown-item" : "dropdown-item"
                          }
                        >
                          Todos
                        </p>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/user/orders/code/${code}`}>
                      {({ isActive }) => (
                        <p
                          className={
                            isActive ? "dropdown-item" : "dropdown-item"
                          }
                        >
                          Buscar
                        </p>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      {({ isActive }) => (
                        <p
                          className={
                            isActive ? "dropdown-item" : "dropdown-item"
                          }
                        >
                          Cancelar
                        </p>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Routes>
        <Route exact path="/user/profile/:code" element={<UserProfile />} />
      </Routes> */}
    </div>
  );
};

export default MainUser;
