import axios from "axios";
import React from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  if (!Array.isArray(shoppingCart)) {
    shoppingCart = [shoppingCart];
  } else {
    if (!shoppingCart.length) setShoppingCart(null);
  }

  const handleCloseTable = () => {
    setShoppingCart(null);
  };

  const handlePurchase = () => {};

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
          setShoppingCart(res.data.products);
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
      .delete('/api/user/shopping-cart/delete/all', options)
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
      {console.log("lista: ", shoppingCart)}

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
              shoppingCart.map((product, index) => {
                console.log("asdsd", index);
                return (
                  <ShoppingCartTableRow
                    key={index}
                    product={product}
                    userCode={userCode}
                    removeItem={removeItem}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={removeAllItems}>
          Limpiar
        </button>
        <button className="btn btn-danger" onClick={handleCloseTable}>
          Close
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          Pagar
        </button>
      </div>
    </div>
  );
};
