import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useParams } from "react-router-dom";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const params = useParams();
  const { userCode } = params;

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
        timeout: 5000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setShoppingCart(res.data);            
          } else {
            alert("Carrito vacío :(");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart(userCode);
  }, []);

  return (
    <>
      <h1>Mi carrito</h1>
      {console.log(shoppingCart)}
      {shoppingCart && (
        <ShoppingCartTable
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          userCode={userCode}
        />
      )}
    </>
  );
};

export default ShoppingCart;
