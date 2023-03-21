import React, { useState, useEffect } from "react";

export const ShoppingCartTableRow = ({
  product,
  userCode,
  removeItem,
  index,
  handleUpdateToBuy,
}) => {
  const [toBuy, setToBuy] = useState(product.toBuy);

  useEffect(() => {
    handleUpdateToBuy(toBuy, index);
  }, [toBuy]);

  //console.log(product.image.data);

  // const toBase64 = (arr) => {
  //   //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   return btoa(
  //     arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  //   );
  // };

  const handleChangeToBuy = (e) => {
    if (e.target.value === "") setToBuy(1);
    else setToBuy(parseInt(e.target.value));
    handleUpdateToBuy(toBuy, index);
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
            value={toBuy}
            onChange={handleChangeToBuy}
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
