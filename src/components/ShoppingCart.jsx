import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useLocation } from "react-router-dom";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  let location=useLocation();
  const code=location.state.code;

  useEffect(() => {
    const getShoppingCart = async (code) => {
      const options = {
        url: "/user/shopping-cart",
        method: "get",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        data: { code },
      };

      await axios
        .request(options)
        .then((res) => {
          if (res.data) {
            setShoppingCart(res.data);
            alert("Carrito encontrado!");
          } else {
            alert("Carrito no encontrado :(");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart(code);
  }, [code]);

  return (
    <>
      <h1>Mi carrito</h1>
      {shoppingCart && (
        <ShoppingCartTable
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
      )}
    </>
  );
};

export default ShoppingCart;
