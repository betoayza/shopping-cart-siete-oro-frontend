import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";
import { Loader } from "./Loader";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState({ products: [] });
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const { userCode, username } = params; //userCode = shoppingCart.code

  //Finds All Items
  useEffect(() => {
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
            setShoppingCart(res.data);
            setLoader(false);
          } else setShoppingCart(null);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [shoppingCart]);

  return loader ? (
    <Loader />
  ) : (
    <div className={"h-100 w-100"}>
      <NavBarUser
        code={userCode}
        shoppingCart={shoppingCart}
        username={username}
      />
      {console.log(userCode)}

      <h1>Mi carrito</h1>

      {shoppingCart.products.length ? (
        <ShoppingCartTable
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          userCode={userCode}
        />
      ) : (
        <div className={"d-grid align-items-center"} style={{ height: "80%" }}>
          <h3 style={{ color: "red" }}>Carrito vacío</h3>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
