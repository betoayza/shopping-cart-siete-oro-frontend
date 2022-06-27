import React from "react";

export const ProductsTable = ({products}) => {    
  
    return (
    <div>
      <h1>Productos encontrados</h1>
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
    </div>
  );
};
