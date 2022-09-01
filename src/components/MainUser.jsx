import React, { useState } from "react";
import SearchingBar from "./SearchingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams, NavLink } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";

const MainUser = () => {
  const [modal, setModal] = useState(false);
  const [modalSearchProducts, setModalSearchProducts] = useState(false);
  const [products, setProducts] = useState(null);
  const [term, setTerm] = useState("");
  const params = useParams();
  const { code } = params;
  console.log(code);

  const handleClose = () => {
    setModal(false);
    setModalSearchProducts(false);
  };

  return modal ? (
    <Modal>
      {modalSearchProducts && (
        <>
          <SearchingBar
            term={term}
            setTerm={setTerm}
            setProducts={setProducts}
            setModal={setModal}
            setModalSearchProducts={setModalSearchProducts}
          />
          <ProductsTableUsers
            products={products}
            setProducts={setProducts}
            userCode={code}
            showSearchingBar={false}
          />
          <button
            type={"button"}
            onClick={handleClose}
            className={"btn btn-danger"}
          >
            Cerrar
          </button>
        </>
      )}
    </Modal>
  ) : (
    <>
      <SearchingBar
        term={term}
        setTerm={setTerm}
        setProducts={setProducts}
        setModal={setModal}
        setModalSearchProducts={setModalSearchProducts}
      />
      <h2>Elija su opción:</h2>

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
                      className={
                        isActive ? "nav-link active" : "nav-link active"
                      }
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
      </nav>
      {/* <Routes>
        <Route exact path="/user/profile/:code" element={<UserProfile />} />
      </Routes> */}
    </>
  );
};

export default MainUser;
