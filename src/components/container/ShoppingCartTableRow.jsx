import React, { useState, useEffect } from "react";

export const ShoppingCartTableRow = ({
  product,
  userCode,
  removeItem,
  itemIndex,
  handleUpdateItemCounter,
}) => {
  const [itemCounter, setItemCounter] = useState(product.toBuy);

  // maneja la asincronicidad del useState
  useEffect(() => {
    handleUpdateItemCounter(itemCounter, itemIndex);
  }, [itemCounter]);

  const handleChangeItemCounter = (e) => {
    if (e.target.value === "") setItemCounter(1);
    else setItemCounter(parseInt(e.target.value));
  };

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>${product.price}</td>
      <td>
        <div className={"d-flex justify-content-center"}>
          <input
            type="number"
            className={"form-control"}
            style={{ width: "100px" }}
            max={product.stock}
            min={1}
            value={itemCounter}
            onChange={handleChangeItemCounter}
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
          onClick={(e) => removeItem(product.code, userCode, index)}
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
