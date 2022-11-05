import React from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";

export const ProductsTableNotUsers = ({ products }) => {
  return (
    <div className={"p-3"}>
      <div className={"products-list"}>
        {products.length &&
        products.filter((product) => {
          return product.stock > 0;
        }).length ? (
          <div className={"vw-75 p-3"}>
            {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
            <div className={"products-list"}>
              {products.map((product, index) => {
                return (
                  product.stock > 0 && (
                    <ProductCardNotUser key={index} product={product} />
                  )
                );
              })}
            </div>
          </div>
        ) : (
          <h2>Sin resultados :(</h2>
        )}
      </div>
    </div>
  );
};
