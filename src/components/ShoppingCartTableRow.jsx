import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      <td className={"p-1"}>
        <div>
          <input
            type="number"
            className={"form-control"}
            style={{ width: "80px" }}
            max={product.stock}
            min={1}
            value={toBuy}
            onChange={(e) => {
              handleToBuy(e);
            }}
          />
        </div>
      </td>
      <td>
        <img
          src={"data:image/png;base64," + product.image}
          alt="Producto"
          height={100}
          width={150}
        />
      </td>
      <td>
        <button
          className={"btn btn-danger"}
          onClick={() => removeItem(product.code, userCode, index)}
        >
          <i
            className="bi-trash-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </td>
    </tr>
  );
};
