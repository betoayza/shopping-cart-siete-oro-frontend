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
      {/* <table id={"products-table"} className={"table table-light table-hover"}>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Disponibles</th>
            <th scope="col">Foto</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody> */}
        <div className={"products-list border"}>
          {products &&
            products.map((product, index) => {
              return (
                // <ProductTableRowUsers
                //   key={index}
                //   product={product}
                //   userCode={userCode}
                // />
                <ProductCard
                  key={index}
                  index={index}
                  product={product}
                  userCode={userCode}
                />
              );
            })}
        </div>
        {/* </tbody>
      </table> */}
    </div>
  );
};
