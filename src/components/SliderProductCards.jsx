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
  }, []);

  return (
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        {products.length &&
          products.map((product) => {
            return (
              <div class="carousel-item active">
                <ProductCardNotUser product={product} />
              </div>
            );
          })}

        {/* <div class="carousel-item active">
          <img src="..." class="d-block w-100" alt="..." />
        </div>

        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="..." />
        </div>

        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="..." />
        </div> */}
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};
