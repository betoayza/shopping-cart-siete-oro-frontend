import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";
import { helpAxios } from "../../helpers/helpAxios";

export const SliderProductCards = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const result = await helpAxios().getActiveProducts();

      if (result instanceof Error) setIsError(true);
      else setProducts(result);
    };
    getProducts();
  }, []);

  return isError ? (
    <h2 className="text-center">
      <span style={{ color: "maroon" }}>Error en la conexión :(</span>
    </h2>
  ) : products.length ? (
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
              <ProductCardNotUser key={product.code} product={product} />
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
  ) : (
    <h5 className="text-center">No hay productos disponibles aún :(</h5>
  );
};
