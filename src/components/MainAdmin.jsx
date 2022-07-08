import React from "react";
import {
  AllOrders,
  ReceivedOrders,
  OrderByCode,
  AddProduct,
  DeleteProduct,
  ModifyProduct,
  AllProducts,
  ProductByID,
} from "./indexComponents";

const MainAdmin = () => {
  return (
    <>
      <h3>Admin</h3>
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

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Productos
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/cars/add"
                      >
                        Agregar
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/cars/delete">
                        Dar de baja
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/clients/add"
                      >
                        Ver todos
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/cars/search"
                      >
                        Por Codigo
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/cars/modify"
                      >
                        Modificar
                      </a>
                    </li>
                  </ul>
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
                    Usuarios
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/clients/add"
                      >
                        Ver todos
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/clients/add"
                      >
                        Por Codigo
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/clients/delete"
                      >
                        Dar de baja
                      </a>
                    </li>
                  </ul>
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
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/services/add"
                      >
                        Todos
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/car-workshop-frontend/#/services/add"
                      >
                        Por ID Usuario
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
