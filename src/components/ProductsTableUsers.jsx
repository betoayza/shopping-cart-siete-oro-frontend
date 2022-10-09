import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductsTableUsers = ({
  products,
  setProducts,
  userCode,
  showSearchingBar = true,
}) => {
  if (!Array.isArray(products)) {
    products = [products];
  }

  return (
    <div className={"p-3"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}      
        <div className={"products-list border"}>
          {products &&
            products.map((product, index) => {
              return (                
                <ProductCard
                  key={index}
                  index={index}
                  product={product}
                  userCode={userCode}
                />
              );
            })}
        </div>
        
    </div>
  );
};
