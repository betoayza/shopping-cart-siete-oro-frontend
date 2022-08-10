import React from "react";
import { ProductTableRow } from "./ProductTableRow";

export const ProductsTable = ({ products, setProducts }) => {
  if (!Array.isArray(products)) {
    products = [products];
  }

  const handleCloseTable = () => {
    setProducts(null);
  };

  return (
    <div>
      <h3>Productos encontrados:</h3>
      <table id="products-table" className="table table-success">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Foto</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return <ProductTableRow key={product._id} product={product} />;
            })}
        </tbody>
      </table>
      <button
        className="btn btn-danger"
        type="Clean"
        onClick={handleCloseTable}
      >
        Close
      </button>
    </div>
  );
};
