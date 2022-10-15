import React, { useState, useEffect } from "react";
import SearchingBar from "./SearchingBar";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { NavBarUser } from "./NavBarUser";
import axios from "axios";

const MainUser = () => {
  const [modal, setModal] = useState(false);
  const [modalSearchProducts, setModalSearchProducts] = useState(false);
  const [products, setProducts] = useState(null);
  const [term, setTerm] = useState("");
  const [shoppingCart, setShoppingCart] = useState(null);

  const { code } = useParams();

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
          if (res.data) setShoppingCart(res.data);
          else setShoppingCart(null);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [shoppingCart, code]);

  return modal ? (
    <Modal>
      {modalSearchProducts && (
        <div className={"searching-bar-div"}>
          <SearchingBar
            term={term}
            setTerm={setTerm}
            setProducts={setProducts}
            setModal={setModal}
            setModalSearchProducts={setModalSearchProducts}
          />
          <ProductsTableUsers
            products={products}
            userCode={code}
            showButton={true}
          />
        </div>
      )}
    </Modal>
  ) : (
    <div className={"h-100 border"}>
      <NavBarUser code={code} shoppingCart={shoppingCart} />
      <div className={"h-75 d-grid align-content-center"}>
        <SearchingBar
          term={term}
          setTerm={setTerm}
          setProducts={setProducts}
          setModal={setModal}
          setModalSearchProducts={setModalSearchProducts}
        />
      </div>
    </div>
  );
};

export default MainUser;
