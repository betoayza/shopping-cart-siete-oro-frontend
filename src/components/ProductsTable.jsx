import React, { useState } from "react";
import { ProductTableRow } from "./ProductTableRow";
import ModifyProduct from "./ModifyProduct";
import { Modal } from "./Modal";

export const ProductsTable = ({ products, setProducts }) => {
  const [modal, setModal] = useState(false);
  const [productCode, setProductCode] = useState(null);

  if (!Array.isArray(products)) {
    products = [products];
  }

  const handleCloseTable = () => {
    setProducts(null);
  };

  const handleUpdate = (productCode) => {
    setModal(true);
    setProductCode(productCode);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleDelete = () => {};

  return modal ? (
    <Modal>
      <ModifyProduct code={productCode} setModal={setModal} />
    </Modal>
  ) : (
    <div>
      (<h3>Productos encontrados:</h3>
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
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              );
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
      )
    </div>
  );
};
