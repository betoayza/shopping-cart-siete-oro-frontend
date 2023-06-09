import React, { useState, useEffect } from "react";
import { Loader } from "../pure/Loader";
import { ProductCardOrderItem } from "./ProductCardOrderItem";

export const OrderItemsTableUser = ({
  products,
  userCode,
  showButton = true,
  username,
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
  ) : products.length &&
    products.filter((product) => {
      return product.stock > 0;
    }).length ? (
    <div className={"col w-100"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <div className={"w-100 row row-cols-auto container mx-auto"}>
        {products.map((product, index) => {
          return (
            product.stock > 0 && (
              <div className={"col col-md-auto"} key={index}>
                <ProductCardOrderItem
                  index={index}
                  product={product}
                  userCode={userCode}
                  showButton={showButton}
                  username={username}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  ) : (
    <h2>Sin resultados :(</h2>
  );
};
