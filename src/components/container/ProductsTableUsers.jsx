import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductsTableUsers = ({
  products,
  userCode,
  showButton = true,
  username,
}) => {
  return (
    <div className={"col w-100"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <div className={"w-100 row row-cols-auto container mx-auto"}>
        {products.map((product, index) => {
          return (
            <div className={"col col-md-auto"}>
              <ProductCard
                key={product.code}
                index={index}
                product={product}
                userCode={userCode}
                showButton={showButton}
                username={username}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
