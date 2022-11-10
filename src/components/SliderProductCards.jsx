import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";
import { API } from "../api/api";

export const SliderProductCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const options = {
        url: `${API}/products/active/all`,

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
          }
        })
        .catch((error) => error);
    };
    getProducts();
  }, [products]);

  return products.length ? (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {products.map((product, index) => {
          return (
            <div
              className={`carousel-item ${index === 0 && "active"}`}
              data-bs-interval="3000"
            >
              <ProductCardNotUser product={product} />
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  ) : null;
};
