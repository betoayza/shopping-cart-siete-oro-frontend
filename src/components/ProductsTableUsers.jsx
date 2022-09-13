import React from "react";
import { ProductTableRowUsers } from "./ProductTableRowUsers";

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
    <div>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <table id={"products-table"} className={"table table-light table-hover"}>
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
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <ProductTableRowUsers
                  key={product._id}
                  product={product}
                  userCode={userCode}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
