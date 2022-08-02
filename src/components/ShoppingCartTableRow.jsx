import React from "react";

export const ShoppingCartTableRow = ({ product, userCode, removeItem }) => {
  // console.log("Producto fila: ", product);
  // console.log(product.image);

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <img
          src={"data:image/png;base64," + product.image}   
          alt="Producto"       
          height={200}
          width={300}
        />
      </td>
      <td>
        <button onClick={() => removeItem(product.code, userCode)}>
          Quitar
        </button>
      </td>
    </tr>
  );
};
