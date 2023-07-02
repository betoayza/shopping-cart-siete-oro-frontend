import React, { useState, useEffect, useCallback } from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../../components/pure/Loader";

export const SliderProductCards = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 3000;

  const getProducts = useCallback(async () => {
    try {
      const activeProducts = await helpAxios().getAllActiveProducts();

      if (
        Object.prototype.toString.call(activeProducts) === "[object Error]" ||
        activeProducts.name === "AxiosError"
      )
        throw new Error();

      const availableProducts = activeProducts.filter(
        (product) => product.stock > 0
      );

      setProducts(availableProducts);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getProducts]);

  return isError ? (
    <Loader />
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
    <h4 className="text-center" style={{ color: "maroon" }}>
      No hay productos disponibles aún :(
    </h4>
  );
};
