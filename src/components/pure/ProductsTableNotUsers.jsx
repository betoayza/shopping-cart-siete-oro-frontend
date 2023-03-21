import React from "react";
import { ProductCardNotUser } from "../container/ProductCardNotUser";

export const ProductsTableNotUsers = ({ products }) => {
  return products.length &&
    products.filter((product) => {
      return product.stock > 0;
    }).length ? (
    <div className={"col w-100"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}

      <div
        className={
          "vw-100 row row-cols-auto container d-flex justify-content-center"
        }
      >
        {products.map((product, index) => {
          return (
            product.stock > 0 && (
              <div className={"row"}>
                <ProductCardNotUser key={index} product={product} />
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
