import React, { useState, useEffect } from "react";
import SearchingBar from "../pure/SearchingBar";
import { useParams } from "react-router-dom";
import { Modal } from "../pure/Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { NavBarUser } from "./NavBarUser";
import axios from "axios";
import logo from "../img/logo-siete-oro.png";
import AllProductsUser from "../../pages/products/AllProductsUser";

const MainUser = () => {
  const [modal, setModal] = useState(false);
  const [modalSearchProducts, setModalSearchProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState("");
  const [shoppingCart, setShoppingCart] = useState({ products: [] });

  const { code, username } = useParams();

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
        params: { userCode },
        timeout: 2999,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setShoppingCart(res.data);
          else setShoppingCart({ products: [] });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [shoppingCart]);

  return modal ? (
    <Modal>
      {modalSearchProducts && (
        <div className={"vh-100 searching-bar-div"}>
          <div className={""}>
            <SearchingBar
              term={term}
              setTerm={setTerm}
              setProducts={setProducts}
              setModal={setModal}
              setModalSearchProducts={setModalSearchProducts}
            />
          </div>
          <div className={""}>
            <ProductsTableUsers
              products={products}
              setProducts={setProducts}
              userCode={code}
              showButton={true}
              username={username}
            />
          </div>
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
          counterCart={shoppingCart.products.length}
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
