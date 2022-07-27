import React from "react";

export const ProductTableRow = ({ product }) => {
  console.log(product.image, typeof product.image);

  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <>
      <tr>
        <td>{product.code}</td>
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
        <td>{product.status}</td>
      </tr>
    </>
  );
};
