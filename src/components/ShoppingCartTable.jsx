import axios from "axios";
import React from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";

export const ShoppingCartTable = ({ shoppingCart, setShoppingCart, userCode }) => {
  if (!Array.isArray(shoppingCart)) {
    shoppingCart = [shoppingCart];
  }

  const handleCloseTable = () => {
    setShoppingCart(null);
  };

  const removeItem = async (prodCode, userCode) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { prodCode, userCode },
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
    // console.log(e.target);

    // const options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "*",
    //     Accept: "application/json",
    //     timeout: 3000,
    //   },
    //   data: { code },
    // };

    // await axios
    //   .request(options)
    //   .then((res) => {
    //     console.log(res.data);        
    //     if (res.data) {
    //       setShoppingCart([]);
    //       alert("Items borrados!");
    //     } else {
    //       alert("Carrito inexistente :(");
    //     }
    //   })
    //   .catch((error) => error);
  };

  return (
    <div className="responsible-table" id="shopping-cart-div">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Articulo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>            
            <th scope="col">Imagen</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {shoppingCart &&
            shoppingCart.map((product) => {
              <ShoppingCartTableRow
                key={product._id}
                product={product}
                userCode={userCode} 
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
