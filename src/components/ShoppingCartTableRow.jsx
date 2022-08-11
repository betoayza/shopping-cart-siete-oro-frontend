import React, { useState, useEffect } from "react";

export const ShoppingCartTableRow = ({
  product,
  userCode,
  removeItem,
  updateToBuy,
  index,
}) => {
  const [toBuy, setToBuy] = useState(product.toBuy);

  useEffect(() => {
    updateToBuy(toBuy, index);
  }, [toBuy]);

  const handleToBuy = (e) => {
    setToBuy(parseInt(e.target.value));
  };

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <input
          type="number"
          style={{ width: "80px" }}
          max={product.stock}
          min={1}
          value={toBuy}
          onChange={(e) => {
            handleToBuy(e);
          }}
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
