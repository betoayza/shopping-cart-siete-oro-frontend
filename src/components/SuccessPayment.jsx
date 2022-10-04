import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { NavBarUser } from "./NavBarUser";

export const SuccessPayment = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const [orderAdded, setOrderAdded] = useState(false);
  const [itemsRemoved, setItemsRemoved] = useState(false);
  const [products, setProducts] = useState(null);
  let navigate = useNavigate(null);
  let location = useLocation();

  let { userCode } = useParams();

  console.log(location.pathname, " | ", userCode);

  useEffect(() => {
    //mount fase
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
          if (res.data) {
            //alert("Carrito vacio obtenido");
            setShoppingCart(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, []);

  //unmount fase
  //return () => {
  useEffect(() => {
    //2) register order
    const addOrder = async () => {
      const items = shoppingCart.products.map((product) => ({
        ...product,
        image: "",
      }));

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
            //alert("Orden agregada ;)");
            setOrderAdded(true);
          } else {
            alert("No se pudo registrar el pedido :(");
          }
        })
        .catch((error) => error);
    };
    //if (shoppingCart.products.length > 0)
    if (shoppingCart) addOrder();

    //3) clean shopping cart
    const removeAllItems = async () => {
      //working
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
            setItemsRemoved(true);
          }
        })
        .catch((error) => error);
    };
    //if (shoppingCart.products.length > 0)
    if (shoppingCart) removeAllItems();
    // };
  }, [shoppingCart]);

  return orderAdded && itemsRemoved ? (
    <div className={"nav-bar"}>
      <NavBarUser code={userCode} />
      <h2>Mi carrito</h2>
      <h3>Carrito vacío</h3>
      <h2>Gracias por su compra ;)</h2>
    </div>
  ) : (
    <div className={"nav-bar"}>
      <NavBarUser code={userCode} />
      <h1>Un error ocurrió :(</h1>
    </div>
  );
};
