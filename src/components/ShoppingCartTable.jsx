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

  useEffect(() => {
    const updateToBuy = async () => {
      console.log("Quantity: ", toBuy, " | Index: ", itemIndex);

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
            //alert("ToBuy actualizado");
            setShoppingCart(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    updateToBuy();
  }, [toBuy, itemIndex]);
 
  const handleUpdateToBuy = (quantity, index) => {
    setToBuy(quantity);
    setItemIndex(index);
  }

  const handlePurchase = async () => {
    //get shopping cart refreshed
    // const getShoppingCart = async () => {
    //   const options = {
    //     url: "/api/user/shopping-cart",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "*",
    //       Accept: "application/json",
    //     },
    //     params: { userCode },
    //     timeout: 3002,
    //   };

    //   await axios
    //     .request(options)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data) {
    //         setShoppingCart(res.data);           
    //       } 
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    // getShoppingCart();

    let items = shoppingCart.products.map((product) => ({
      ...product,
      ["image"]: "",
    }));

    alert(JSON.stringify({items}));

    if (
      items.filter((item) => {
        return item.toBuy > item.stock;
      }).length
    ) {
      alert("Cantidad incorrecta :(");
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
        if (res.data) {
          alert("Item borrado exitosamente");
        }
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
          alert("Lista items borrados");
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return (
    shoppingCart && (
      <div className={"w-100 d-flex justify-content-center"}>
        <div
          className={"table-responsive overflow-auto"}
          style={{ width: "75%", maxHeight: "500px" }}
        >
          <table className={"table table-hover table-sm"}>
            <thead className={"table-success"}>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Precio /u</th>
                <th scope="col">A llevar</th>
                <th scope="col">Max</th>
                <th scope="col">Imagen</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {shoppingCart.products.map((product, index) => {
                return (
                  <ShoppingCartTableRow
                    key={index}
                    product={product}
                    userCode={userCode}
                    removeItem={removeItem}
                    index={index}
                    handleUpdateToBuy={handleUpdateToBuy}
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
    )
  );
  // );
};
