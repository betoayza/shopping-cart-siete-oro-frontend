import React from "react";
import { NavLink } from "react-router-dom";

const MainAdmin = () => {
  return (
    <>      
      <div>
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
                  <a className="nav-link active" aria-current="page" href="/">
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

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pedidos
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/admin/orders/all">
                        Ver Todos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/admin/orders/code">
                        Por Usuario
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/admin/orders/code">
                        Entregados
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainAdmin;
