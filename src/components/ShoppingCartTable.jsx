import axios from "axios";
import React, { useState, useEffect } from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  const [toBuy, setToBuy] = useState(1);
  const [itemIndex, setItemIndex] = useState(null);

  let navigate = useNavigate();

  // update item quatitity brings back shopping cart updated
  useEffect(() => {
    console.log("dsa: ", toBuy, itemIndex);
    const updateToBuy = async () => {
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
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            };
            getShoppingCart();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    updateToBuy();
  }, [toBuy, itemIndex]);

  //SET NEW QUANTITY TO BUY
  const updateToBuy = async (toBuy, itemIndex) => {
    setToBuy(toBuy);
    setItemIndex(itemIndex);
  };

  const handlePurchase = async () => {
    let items = await shoppingCart.products.map((product) => ({
      ...product,
      image: "",
    }));

    console.log(items);

    if (
      items.filter((item) => {
        return !item.toBuy || item.toBuy === "";
      }).length
    ) {
      alert("Debe especificar cantidad!");
    } else {
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
        data: { items, userCode },
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
    }
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
          setShoppingCart(res.data);
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return shoppingCart.products.length ? (
    <div className={"w-75 border"}>
      <div className={""}>
        <table className={"table table-light table-hover table-responsive"}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">A llevar</th>
              <th scope="col">Max</th>
              <th scope="col">Imagen</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.products.map((product, index) => {
              console.log("Index: ", index);
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

        <button className="btn btn-dark" onClick={removeAllItems}>
          <i
            className="bi-cart-x-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          <i
            className="bi-credit-card"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </div>
    </div>
  ) : (
    <h2>Carrito vacío</h2>
  );
  // );
};
