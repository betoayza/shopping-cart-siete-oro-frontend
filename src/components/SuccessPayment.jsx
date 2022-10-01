import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { NavBarUser } from "./NavBarUser";

export const SuccessPayment = () => {
  const [shoppingCart, setShoppingCart] = useState({ products: [] });
  let navigate = useNavigate(null);
  let location = useLocation();
  let { userCode } = useParams();

  console.log(location.pathname, " | ", userCode);

  useEffect(() => {
    //1) get all items from shopping cart
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
          if (res.data) setShoppingCart(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
    //2) register order
    const addOrder = async () => {
      let items = shoppingCart.products;
      const options = {
        url: "/api/user/orders/add",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { userCode, items },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            alert("Orden agregada ;)");
          } else {
            alert("No se pudo registrar el pedido :(");
          }
        })
        .catch((error) => error);
    };
    addOrder();

    //3) clean shopping cart
    const removeAllItems = async () => { //working
      // working
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { userCode },
      };
      await axios
        .delete("/api/user/shopping-cart/delete/all", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {            
            setShoppingCart(res.data);
          }
        })
        .catch((error) => error);
    };
    removeAllItems();
  }, []);

  return (
    <div className={"nav-bar"}>
      <NavBarUser code={userCode} />
      <h2>Mi carrito</h2>
      <ShoppingCartTable
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        userCode={userCode}
      />
      <h2>Gracias por su compra ;)</h2>
    </div>
  );
};
