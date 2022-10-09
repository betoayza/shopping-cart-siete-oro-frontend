import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import { CodeContext } from "./ShoppingCart";
import "bootstrap-icons/font/bootstrap-icons.css";

export const NavBarUser = ({ code, cartCounter }) => {
  // const [counterItems, setCounterItems] = useState(0);
  // const { shoppingCart } = useContext(CodeContext);

  // useEffect(() => {
  //   const getShoppingCart = async () => {
  //     let userCode = code;
  //     const options = {
  //       url: "/api/user/shopping-cart",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Accept: "application/json",
  //       },
  //       params: { userCode },
  //       timeout: 3000,
  //     };

  //     await axios
  //       .request(options)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data) setCounterItems(res.data.products.length);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   getShoppingCart();
  // }, [counterItems]);

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
                  <p
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    Buscar
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
                    <span className="position-relative">
                      <FontAwesomeIcon icon={faCartShopping} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCounter}
                      </span>
                    </span>
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
