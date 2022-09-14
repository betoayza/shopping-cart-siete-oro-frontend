import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartTable } from "./ShoppingCartTable";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";


const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(null);  
  const params = useParams();
  const { userCode } = params;

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
        timeout: 5000,
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
    getShoppingCart(userCode);
  }, []);

  // const handlePurchase = () => {
  //   setModal(true);
  //   setModalPaymentForm(true);
  // };

  return shoppingCart ? (
    <>
      <NavBarUser code={userCode} />
      {console.log(userCode)}

      <h2>Mi carrito</h2>
      <ShoppingCartTable
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        userCode={userCode}
      />

      {/* <button
        type={"button"}
        className={"btn btn-success"}
        onClick={handlePurchase}
      >
        Purchase
      </button> */}      
    </>
  ) : (
    <div className={"nav-bar"}>
      <NavBarUser code={userCode} />
      {console.log(userCode)}
      <h3>Carrito Vacío :(</h3>
      {/* <button type="button" className={"btn btn-danger"} onClick={handleClose}>
        Close
      </button> */}
    </div>
  );
};

export default ShoppingCart;
