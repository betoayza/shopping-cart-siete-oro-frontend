import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo-siete-oro.png";
import { helpAxios } from "../../helpers/helpAxios";

export const NavBarUser = ({ code, counterCart = 0, username }) => {
  const [itemsCounter, setItemsCounter] = useState(counterCart);
  const userCode = code;
  const intervalTime = 3000;

  const getCartItemsCounter = useCallback(async (userCode) => {
    try {
      const shoppingCart = await helpAxios().getShoppingCart(userCode);

      if (
        Object.prototype.toString.call(shoppingCart) === "[object Error]" ||
        shoppingCart.name === "AxiosError"
      )
        throw new Error();

      setItemsCounter(shoppingCart.products.length);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCartItemsCounter(userCode);
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getCartItemsCounter]);

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
                  <p
                    className={isActive ? "nav-link active" : "nav-link active"}
                  >
                    <i
                      className="bi-house-door-fill"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${username}/${code}/profile`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-person-circle"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${username}/shopping-cart/${code}`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    <span className="position-relative">
                      <i
                        className="bi-cart-fill"
                        style={{ color: "white", fontSize: "20px" }}
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {itemsCounter}
                      </span>
                    </span>
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/user/${username}/${code}/orders`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-box-seam-fill"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/contact/${username}/${code}`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-telephone-forward-fill"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </p>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/`}>
                {({ isActive }) => (
                  <p className={isActive ? "nav-link" : "nav-link"}>
                    <i
                      className="bi-box-arrow-right"
                      style={{ color: "white", fontSize: "20px" }}
                    ></i>
                  </p>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
