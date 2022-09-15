import React from "react";
import { NavLink } from "react-router-dom";


export const NavBarAdmin = () => {
  return (
    <div className={"nav-bar"}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin">
            Menu
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
                  Home
                </a>
              </li>

              <li className="nav-item">
                <NavLink to="/products/all">
                  {({ isActive }) => (
                    <p
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
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
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
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
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
                    >
                      Pedidos
                    </p>
                  )}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/">
                  {({ isActive }) => (
                    <p
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
                    >
                      Cerrar Sesión
                    </p>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
