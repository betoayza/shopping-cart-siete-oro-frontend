import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export const NavBarUser = ({ code }) => {
  return (
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
                    className={isActive ? "nav-link active" : "nav-link active"}
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
              <NavLink to={`/user/shopping-cart/${code}`}>
                {({ isActive }) => (
                  <span className={isActive ? "nav-link" : "nav-link"}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${code}/orders`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    Mis compras
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    Cerrar sesión
                  </p>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* <Routes>
        <Route exact path="/user/profile/:code" element={<UserProfile />} />
      </Routes> */}
    </nav>
  );
};
