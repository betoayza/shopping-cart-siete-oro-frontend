import React from "react";
import { NavLink } from "react-router-dom";


import "bootstrap-icons/font/bootstrap-icons.css";

export const NavBarUser = ({ code, cartCounter }) => {  

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
              <NavLink to={`/user/${code}`}>
                {({ isActive }) => (
                  <a
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    <i
                      className="bi-house-door-fill"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </a>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/profile/${code}`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-person-circle"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </a>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/shopping-cart/${code}`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
                    <span className="position-relative">                      
                      <i
                        className="bi-cart-fill"
                        style={{ color: "white", fontSize: "20px" }}
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCounter}
                      </span>
                    </span>
                  </a>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${code}/orders`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-box-seam-fill"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </a>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
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
      {/* <Routes>
        <Route exact path="/user/profile/:code" element={<UserProfile />} />
      </Routes> */}
    </nav>
  );
};
