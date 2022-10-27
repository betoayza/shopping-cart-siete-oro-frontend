import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

export const ShoppingCartTableRow = ({
  product,
  userCode,
  removeItem,
  index,
}) => {
  const [toBuy, setToBuy] = useState(product.toBuy);

  useEffect(() => {
    const updateToBuy = async () => {
      const itemIndex = index;
      console.log("Quantity: ", toBuy, " | Index: ", itemIndex);

      const options = {
        url: "/api/user/shopping-cart/update/toBuy",
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { userCode, toBuy, itemIndex },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res);
          if (res.data) {
            //alert("ToBuy actualizado");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    updateToBuy();
  }, [toBuy]);

  const handleChangeToBuy = (e) => {
    if (e.target.value === "") setToBuy(1);
    else setToBuy(parseInt(e.target.value));
  };

  //console.log(product.image.data);

  // const toBase64 = (arr) => {
  //   //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   return btoa(
  //     arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  //   );
  // };

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
