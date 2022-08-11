import axios from "axios";
import React, { useState, useEffect } from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";
import moment from "moment";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  if (!shoppingCart.products.length) setShoppingCart(null);

  const [toBuy, setToBuy] = useState(1);
  const [itemIndex, setItemIndex] = useState(null);

  useEffect(() => {
    console.log("dsa: ", toBuy, itemIndex);
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
            alert("Cantidad actualizada!");
          } else {
            alert("Error en la actualización :(");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      };
      updateToBuy(toBuy, itemIndex);
  }, [toBuy, itemIndex]);

  const updateToBuy = (toBuy, itemIndex) => {
    //console.log("fasdasd: ", toBuy, itemIndex);
    setToBuy(toBuy);
    setItemIndex(itemIndex);   
  };

  const handlePurchase = async () => {
    const date = moment(new Date()).format("DD/MM/YYYY");
    const amount = shoppingCart.reduce(() => a + b);
    const purchase = {
      code: Date.now(),
      userCode,
      products: shoppingCart,
      amount,
      date,
      status: "Activo",
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: {},
    };

    await axios
      .post(`/api/user/shopping-cart/delete`, options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setShoppingCart(res.data.products);
          alert("Eliminacion exitosa");
        } else {
          alert("No se encontró producto");
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
        console.log(res.data);
        if (res.data) {
          setShoppingCart(res.data);
          alert("Eliminacion exitosa");
        } else {
          alert("No se encontró producto");
        }
      })
      .catch((error) => error);
  };

  const removeAllItems = async (e) => {
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
          alert("Items borrados!");
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return (
    <div>
      {console.log("lista: ", shoppingCart.products)}

      <div className="responsible-table" id="shopping-cart-div">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Articulo</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">A comprar</th>
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

        <button className="btn btn-primary" onClick={removeAllItems}>
          Limpiar
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          Comprar
        </button>
      </div>
    </div>
  );
};
