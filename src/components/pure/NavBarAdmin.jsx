import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo-siete-oro.png";

export const NavBarAdmin = () => {
  const optionStyle = {
    textDecoration: "none",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" href="#">
          <img src={logo} style={{ width: 50, height: 50 }} alt="Logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/admin">
                <i
                  className="bi-house-door-fill"
                  style={{ color: "white", fontSize: "20px" }}
                ></i>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/products/all" style={optionStyle}>
                Productos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/users/all" style={optionStyle}>
                Usuarios
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/orders/all" style={optionStyle}>
                Pedidos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/">
                <i
                  className="bi-box-arrow-right"
                  style={{ color: "white", fontSize: "20px" }}
                ></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
