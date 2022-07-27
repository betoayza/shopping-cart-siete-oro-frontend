import React from "react";

export const ShoppingCartTableRow = ({ product, removeItem }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>{product.image}</td>
      <td>
        <button onClick={removeItem(product.code)}>Eliminar</button>
      </td>
    </tr>
  );
};
