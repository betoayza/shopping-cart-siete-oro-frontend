import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";

export const CodeContext = createContext(null);

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState({ products: [] });
  const params = useParams();
  const { userCode } = params; //userCode = shoppingCart.code

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
          if (res.data) setShoppingCart(res.data);
          else setShoppingCart(null);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, [ShoppingCart]);

  return (
    <div className={""}>
      <NavBarUser
        code={shoppingCart.code}
        cartCounter={shoppingCart.products.length}
      />
      {console.log(userCode)}
      <div className={"vh-100"}>
        <h2>Mi carrito</h2>
        <div className={"w-100 d-flex justify-content-center"}>
          {shoppingCart.products.length ? (
            <ShoppingCartTable
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              userCode={userCode}
            />
          ) : (
            <h3>Carrito Vacío :(</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
