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

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <div className={"d-flex justify-content-center"}>
          <input
            type="number"
            className={"form-control"}
            style={{ width: "100px" }}
            max={product.stock}
            min={1}
            value={toBuy}
            onChange={(e) => {
              if (e.target.value === "") setToBuy(1);
              else setToBuy(parseInt(e.target.value));
            }}
            required
          />
        </div>
      </td>
      <td>{product.stock}</td>
      <td>
        <img
          src={"data:image/png;base64," + product.image}
          alt="Producto"
          style={{ height: "100px", width: "150px" }}
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
