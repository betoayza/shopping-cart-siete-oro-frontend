import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { ProductCard } from "./ProductCard";

export const ProductsTableUsers = ({
  products,
  setProducts,
  userCode,
  showButton = true,
}) => {
  const [loader, setLoader] = useState(true);

  if (!Array.isArray(products)) {
    products = [products];
  }

  useEffect(() => {
    if (products) setLoader(false);
  }, [loader, products]); 

  return loader ? (
    <Loader />
  ) : products.length ? (
    <div className={"vw-75 border border-success border-3 p-3"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <div className={"products-list border"}>
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              index={index}
              product={product}
              userCode={userCode}
              showButton={showButton}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <h2>Sin resultados :(</h2>
  );
};
