import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductCardNotUser = ({ product }) => {
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
      </div>
    </div>
  );
};
