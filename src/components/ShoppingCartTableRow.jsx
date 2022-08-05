import React from "react";

export const ShoppingCartTableRow = ({
  product,
  userCode,
  removeItem,
  index,
}) => {
  // console.log("Producto fila: ", product);
  // console.log(product.image);

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <input
          type="number"
          // value={product.toBuy}
          style={{ width: "80px" }}
          max={product.stock}
          min={1}
        />
      </td>
      <td>
        <img
          src={"data:image/png;base64," + product.image}
          alt="Producto"
          height={200}
          width={300}
        />
      </td>
      <td>
        <button onClick={() => removeItem(product.code, userCode, index)}>
          Quitar
        </button>
      </td>
    </tr>
  );
};
