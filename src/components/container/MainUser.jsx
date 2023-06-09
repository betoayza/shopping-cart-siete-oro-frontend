import React, { useState, useEffect, useCallback } from "react";
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
  const [isError, setIsError] = useState(false);
  const { code, username } = useParams();
  const intervalTime = 3000;

  const getShoppingCart = useCallback(async () => {
    try {
      const userShoppingCart = await helpAxios().getShoppingCart(code);

      if (
        Object.prototype.toString.call(userShoppingCart) === "[object Error]" ||
        userShoppingCart.name === "AxiosError"
      )
        throw new Error();

      setShoppingCart(userShoppingCart);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setShoppingCart({ products: [] });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getShoppingCart(code);
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getShoppingCart]);

  return isError ? (
    <Loader />
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
            <h4 style={{ color: "white" }}>No hay productos :(</h4>
          )}
        </div>
      )}
    </Modal>
  ) : (
    <div className={"vw-100 h-100"}>
      <div className={"col"}>
        <NavBarUser code={code} username={username} />
        <h2 className={"fw-bold"} style={{ color: "#6610f2" }}>
          Bienvenido {username}!
        </h2>
        <div className={"h-75 vw-100 mx-auto"}>
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
