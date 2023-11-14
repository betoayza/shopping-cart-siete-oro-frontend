import React, { useState, useEffect, useCallback } from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";
import { helpAxios } from "../../helpers/helpAxios";
// import { Loader } from "../../components/pure/Loader";

// Estoy probando codespaces 


export const SliderProductCards = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const intervalTime = 3000;

  const getProducts = useCallback(async () => {
    try {
      const activeProducts = await helpAxios().getAllActiveProducts();

      console.log(activeProducts, typeof activeProducts);

      const availableProducts = activeProducts.filter(
        (product) => product.stock > 0
      );

      setProducts(availableProducts);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  useEffect(() => {
    // don't use useCallback() hook, because getProducts() already does
    const fetchData = async () => {
      await getProducts();
    };

    fetchData(); // initial execution

    const interval = setInterval(fetchData, intervalTime); // run every 5 secs

    return () => clearInterval(interval);
  }, [getProducts]);

  return error ? (
    <div className="error">Error: {error.message}</div>
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
              key={product.code}
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
  ) : (
    isLoading && (
      <h4 className="text-center" style={{ color: "maroon" }}>
        Loading...
      </h4>
    )
  );
};
