import React, { useState, useEffect } from "react";
import SearchingBar from "./SearchingBar";
import { useParams } from "react-router-dom";
import { Modal } from "../pure/Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { NavBarUser } from "./NavBarUser";
import logo from "../../img/logo-siete-oro.png";
import AllProductsUser from "../../pages/products/AllProductsUser";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

const MainUser = () => {
  const [modal, setModal] = useState(false);
  const [modalSearchProducts, setModalSearchProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState("");
  const [shoppingCart, setShoppingCart] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { code, username } = useParams();

  useEffect(() => {
    const getShoppingCart = async (userCode) => {
      const userShoppingCart = await helpAxios().getShoppingCart(userCode);

      if (userShoppingCart instanceof Error) setIsError(true);
      else setShoppingCart(userShoppingCart);

      setIsLoading(false);
    };

    getShoppingCart(code);
  }, [code]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h3 style={{ color: "maroon" }}>Error en la conexión :(</h3>
  ) : modal ? (
    <Modal>
      {modalSearchProducts && (
        <div className={"vh-100 searching-bar-div text-center"}>
          <div className={""}>
            <SearchingBar
              term={term}
              setTerm={setTerm}
              setProducts={setProducts}
              setModal={setModal}
              setModalSearchProducts={setModalSearchProducts}
            />
          </div>
          {products.length ? (
            <div className={""}>
              <ProductsTableUsers
                products={products}
                setProducts={setProducts}
                userCode={code}
                showButton={true}
                username={username}
              />
            </div>
          ) : (
            <h2>No hay productos :(</h2>
          )}
        </div>
      )}
    </Modal>
  ) : (
    <div
      className={"vw-100 h-100"}
      // style={{ minHeight: "100vh" }}
    >
      <div className={"col"}>
        <NavBarUser
          code={code}
          counterCart={shoppingCart.products?.length}
          username={username}
        />
        <h2 className={"fw-bold"} style={{ color: "#6610f2" }}>
          Bienvenido {username}!
        </h2>
        <div className={"h-75 vw-100 mx-auto"}>
          {/* d-grid justify-items-center */}
          <div>
            <img src={logo} className={"img-fluid"} alt="Logo" />
          </div>
          <SearchingBar
            term={term}
            setTerm={setTerm}
            setProducts={setProducts}
            setModal={setModal}
            setModalSearchProducts={setModalSearchProducts}
          />
        </div>
      </div>
      <br />
      <br />
      <AllProductsUser code={code} username={username} />
    </div>
  );
};

export default MainUser;
