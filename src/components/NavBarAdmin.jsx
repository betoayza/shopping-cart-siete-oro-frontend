import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo-siete-oro.png";

export const NavBarAdmin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} style={{ width: 50, height: 50 }} alt="Logo" />
        </a>
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
              <a className="nav-link active" aria-current="page" href="/admin">
                <i
                  className="bi-house-door-fill"
                  style={{ color: "white", fontSize: "20px" }}
                ></i>
              </a>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/products/all">
                {({ isActive }) => (
                  <p
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    Productos
                  </p>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/users/all">
                {({ isActive }) => (
                  <p
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    Usuarios
                  </p>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/admin/orders/all">
                {({ isActive }) => (
                  <p
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    Pedidos
                  </p>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/">
                {({ isActive }) => (
                  <a
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    <i
                      className="bi-box-arrow-right"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </a>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
