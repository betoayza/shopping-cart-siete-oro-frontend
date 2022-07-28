import React from "react";
import axios from "axios";

export const ProductTableRowUsers = ({ product, userCode }) => {
  console.log(product.image, typeof product.image);
  let productCode = product.code;

  const addToCart = async () => {
    const options = {
      url: "/api/user/shopping-cart/add",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { productCode, userCode },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Agregado exitosamente!");
        } else {
          alert("Un error ocurrió :(");
        }
      })
      .catch((error) => error);    
  };

  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>
          <img
            src={"data:image/png;base64," + toBase64(product.image.data)}
            alt="Producto"
            height={200}
            width={300}
          />
        </td>
        <td>
          <button onClick={addToCart}>Agregar</button>
        </td>
      </tr>
    </>
  );
};