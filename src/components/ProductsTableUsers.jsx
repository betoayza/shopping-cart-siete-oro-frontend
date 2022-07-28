import React from "react";
import { ProductTableRowUsers } from "./ProductTableRowUsers";

export const ProductsTableUsers = ({ products, setProducts, userCode }) => {
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
              return <ProductTableRowUsers key={product._id} product={product} userCode={userCode} />;
            })}
        </tbody>
      </table>
      <button
        className="btn btn-danger"
        type="reset"
        onClick={handleCloseTable}
      >
        Close
      </button>
    </div>
  );
};
