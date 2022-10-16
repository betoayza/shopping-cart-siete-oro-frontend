import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/logo-siete-oro.png";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export const NavBarUser = ({ code, shoppingCart = null, username }) => {
  const [counterCart, setCounterCart] = useState(0);
  // const code = shoppingCart.code;
  // let counterCart = shoppingCart.products.length;

  useEffect(() => {
    let userCode = code;
    const getShoppingCart = async () => {
      const options = {
        url: "/api/user/shopping-cart",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { userCode },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setCounterCart(res.data.products.length);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [shoppingCart]);

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
              <NavLink to={`/user/${username}/${code}`}>
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
              <NavLink to={`/user/${username}/${code}/profile`}>
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
              <NavLink to={`/user/${username}/shopping-cart/${code}`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
                    <span className="position-relative">
                      <i
                        className="bi-cart-fill"
                        style={{ color: "white", fontSize: "20px" }}
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {counterCart}
                      </span>
                    </span>
                  </a>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${username}/${code}/orders`}>
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
    </nav>
  );
};
