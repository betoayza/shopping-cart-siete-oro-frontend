import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo-siete-oro.png";
import axios from "axios";

export const NavBarUser = ({ code, counterCart = 0, username }) => {
  const [itemsCounter, setItemsCounter] = useState(counterCart);

  useEffect(() => {
    let userCode = code;

    const getShoppingCart = async () => {
      const options = {
        url: `${import.meta.env.VITE_API}/user/shopping-cart`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        params: { userCode },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setItemsCounter(res.data.products.length);
          else setItemsCounter(0);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [counterCart]); //always running

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
                        {itemsCounter}
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
              <NavLink to={`/contact/${username}/${code}`}>
                {({ isActive }) => (
                  <a className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-telephone-forward-fill"
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
