import React, { useState, useEffect } from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../../components/pure/Loader";

export const SliderProductCards = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const activeProducts = await helpAxios().getAllActiveProducts();
      console.log(activeProducts)

      if (activeProducts instanceof Error) setIsError(true);
      else {
        const availableProducts = activeProducts.filter(
          (product) => product.stock > 0
        );
        setProducts(availableProducts);
      }

      setIsLoading(false);
    };

    getProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2 className="text-center">Error en la conexión :(</h2>
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
    <h3 className="text-center">No hay productos disponibles aún :(</h3>
  );
};
