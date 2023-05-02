import React from "react";
import { ProductCardNotUser } from "../container/ProductCardNotUser";

export const ProductsTableNotUsers = ({ products }) => {
  return (
    <div className={"col w-100"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}

      <div
        className={
          "vw-100 row row-cols-auto container d-flex justify-content-center"
        }
      >
        {products.map((product) => {
          return (
            product.stock > 0 && (
              <div className={"row"} key={product.code}>
                <ProductCardNotUser product={product} />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
