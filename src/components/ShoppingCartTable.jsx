import axios from "axios";
import React, { useState, useEffect } from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
// import moment from "moment";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  if (!shoppingCart.products.length) setShoppingCart(null);

  const [toBuy, setToBuy] = useState(1);
  const [itemIndex, setItemIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalPaymentForm, setModalPaymentForm] = useState(false);
  const [products, setProducts] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("dsa: ", toBuy, itemIndex);
    //UPDATE QUANTITY TO BUY
    const updateToBuy = async (toBuy, itemIndex) => {
      const options = {
        url: "/api/user/shopping-cart/update/toBuy",
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { userCode, toBuy, itemIndex },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res);
          if (res.data) {
            //GET SHOPPING CART UPDATED
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
                  console.log(res);
                  if (res.data) {
                    setShoppingCart(res.data);
                    setProducts(res.data.products);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            };
            getShoppingCart(userCode);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    updateToBuy(toBuy, itemIndex);
  }, [toBuy, itemIndex]);

  //SET NEW QUANTITY TO BUY
  const updateToBuy = async (toBuy, itemIndex) => {
    setToBuy(toBuy);
    setItemIndex(itemIndex);
  };

  const handlePurchase = async () => {
    let items = products.map((product) => ({
      ...product,
      image: "",
    }));

    const options = {
      url: "/api/payment",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { items },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          window.location.href = res.data.init_point;
        } else {
          navigate(res.data.back_urls.failure);
        }
      })
      .catch((error) => error);
  };

  const removeItem = async (prodCode, userCode, index) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { prodCode, userCode, index },
    };

    await axios
      .delete(`/api/user/shopping-cart/delete`, options)
      .then((res) => {
        console.log(res);
        setShoppingCart(res.data);
      })
      .catch((error) => error);
  };

  const removeAllItems = async () => {
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
          setShoppingCart(null);
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return (
    <div>
      {console.log("lista: ", shoppingCart.products)}

      <div className={"responsible-table"} id={"shopping-cart-div"}>
        <table className={"table table-hover"}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">A llevar</th>
              <th scope="col">Imagen</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart &&
              shoppingCart.products.map((product, index) => {
                console.log("asdsd", index);
                return (
                  <ShoppingCartTableRow
                    key={index}
                    product={product}
                    userCode={userCode}
                    removeItem={removeItem}
                    updateToBuy={updateToBuy}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>

        <button className="btn btn-danger" onClick={removeAllItems}>
          Vaciar
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          Comprar
        </button>
      </div>
    </div>
  );
  // );
};
