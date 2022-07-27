import axios from "axios";
import React from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";

export const ShoppingCartTable = ({ shoppingCart, setShoppingCart }) => {
  if (!Array.isArray(shoppingCart)) {
    shoppingCart = [shoppingCart];
  }

  const handleCloseTable = () => {
    setShoppingCart(null);
  };

  const removeItem = async (prodCode) => {
    console.log(prodCode);

    const options = {
      url: `/user/profile/shopping-cart/delete/${prodCode}`,
      method: "delete",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      data: { prodCode },
    };

    await axios
      .request(options)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setShoppingCart(res.data);
          alert("Eliminacion exitosa");
        } else {
          alert("No se encontró producto");
        }
      })
      .catch((error) => error);
  };

  const removeAllItems = async (e) => {
    console.log(e.target);

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { code },
    };

    await axios
      .request(options)
      .then((res) => {
        //if shopping cart exists
        if (res.data) {
          console.log(res.data);
          setShoppingCart([]);
          alert("Items borrados!");
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="responsible-table" id="shopping-cart-div">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Productos</th> 
          </tr>
        </thead>
        <tbody>
          {shoppingCart &&
            shoppingCart[0].products.forEach((product) => {
              <ShoppingCartTableRow
                key={product._id}
                product={product}
                removeItem={removeItem}
              />;
            })}
        </tbody>
      </table>
      <button onClick={removeAllItems}>Remove all</button>
      <button
        className="btn btn-danger"
        type="reset"
        onClick={handleCloseTable}
      >
        Close
      </button>
    </div>
  );
};
