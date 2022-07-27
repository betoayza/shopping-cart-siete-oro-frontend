import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useParams } from "react-router-dom";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const params = useParams();
  const { userCode } = params;

  useEffect(() => {
    const getShoppingCart = async (userCode) => {
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
            alert("Carrito encontrado!");
          } else {
            alert("Carrito vacío :(");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart(userCode);
  }, [userCode]);

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
