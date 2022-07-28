import React from "react";

export const ShoppingCartTableRow = ({ product, userCode, removeItem }) => {  

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>{product.image}</td>
      <td>
        <button onClick={removeItem(product.code, userCode)}>Eliminar</button>
      </td>
    </tr>
  );
};
