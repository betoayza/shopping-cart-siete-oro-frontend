import React from "react";
import { ProductCardNotUser } from "./ProductCardNotUser";

export const ProductsTableNotUsers = ({ products }) => {
  return (
    <div className={"p-3"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <div className={"products-list border"}>
        {products.length ? (
          products.map((product, index) => {
            return <ProductCardNotUser key={index} product={product} />;
          })
        ) : (
          <h2>Sin resultados :(</h2>
        )}
      </div>
    </div>
  );
};
