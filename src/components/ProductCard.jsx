import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export const ProductCard = ({ index, product, userCode }) => {
  const [isAdded, setIsAdded] = useState(false);

  //check if item is already added to cart
  useEffect(() => {
    const isItemAdded = async () => {
      let prodCode = product.code;
      const options = {
        url: "/api/user/shopping-cart/check-item-added",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { userCode, prodCode },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setIsAdded(true);
          } else {
            setIsAdded(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    isItemAdded();
  }, [isAdded]);

  const addToCart = async () => {
    let productCode = product.code;
    const options = {
      url: "/api/user/shopping-cart/add",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { productCode, userCode },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // alert("Agregado ;)");
          setIsAdded(true);
        }
      })
      .catch((error) => error);
  }; //working

  const removeFromCart = async () => {
    let prodCode = product.code;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { prodCode, userCode, index },
    };

    await axios
      .delete(`/api/user/shopping-cart/delete`, options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // alert("Quitado del carrito :(");
          setIsAdded(false);
        }
      })
      .catch((error) => error);
  };
  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <div className={"card p-2"} style={{ width: "200px", height: "auto" }}>
      <div>
        <img
          src={"data:image/png;base64," + toBase64(product.image.data)}
          className="card-img-top"
          alt="Imagen"
        />
        <h5 className="card-title">{product.name}</h5>
      </div>
      <div className={"card-body"}>
        <span className="card-text align-middle">{product.description}</span>
        <h3>Stock: {product.stock}</h3>
        <h3>{product.price}</h3>
        {isAdded ? (
          <button className={"btn btn-danger"} onClick={removeFromCart}>
            <i
              className="bi-dash-lg"
              style={{ color: "white", fontSize: "20px" }}
            ></i>
          </button>
        ) : (
          <button className={"btn btn-success"} onClick={addToCart}>
            <i
              className="bi-plus-lg"
              style={{ color: "white", fontSize: "20px" }}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};
