import React, { useState, useEffect } from "react";
import { ProductTableRow } from "./ProductTableRow";
import { ModifyProduct } from "./ModifyProduct";
import { Modal } from "./Modal";
import axios from "axios";
import { SelectProductsCodes } from "./SelectProductsCodes";
import { SearchProductByCode } from "./SearchProductByCode";
import { AddProduct } from "./AddProduct";
import { ActivateProduct } from "./ActivateProduct";
import DeleteProduct from "./DeleteProduct";
import MainAdmin from "./MainAdmin";

export const ProductsTable = ({
  products,
  setProducts,
  addAndSearch = true,
}) => {
  const [modal, setModal] = useState(false);
  const [productCode, setProductCode] = useState(null);
  const [modalSearchProduct, setModalSearchProduct] = useState(false);
  const [modalModifyProduct, setModalModifyProduct] = useState(false);
  const [showAddAndSearch, setShowAddAndSearch] = useState(addAndSearch);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [modalActivateProduct, setModalActivateProduct] = useState(false);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);

  if (!Array.isArray(products)) {
    products = [products];
  }

  const handleUpdate = (prodCode) => {
    setModal(true);
    setProductCode(prodCode);
    setModalModifyProduct(true);
  };

  const handleDelete = (prodCode) => {
    setProductCode(prodCode);
    setModal(true);
    setModalDeleteProduct(true);
  };  

  const handleAddProduct = () => {
    setModal(true);
    setModalAddProduct(true);
  };

  const handleActivate = (prodCode) => {
    setProductCode(prodCode);
    setModal(true);
    setModalActivateProduct(true);
  };

  return modal ? (
    <Modal>
      {modalModifyProduct && (
        <ModifyProduct
          code={productCode}
          setModal={setModal}
          setModalModifyProduct={setModalModifyProduct}
        />
      )}
      {modalSearchProduct && (
        <SearchProductByCode
          code={productCode}
          setModal={setModal}
          setModalSearchProduct={setModalSearchProduct}
        />
      )}
      {modalAddProduct && (
        <AddProduct
          setModal={setModal}
          setModalAddProduct={setModalAddProduct}
          setProducts={setProducts}
        />
      )}
      {modalActivateProduct && (
        <ActivateProduct
          code={productCode}
          setModal={setModal}
          setModalActivateProduct={setModalActivateProduct}
        />
      )}
      {modalDeleteProduct && (
        <DeleteProduct
          code={productCode}
          setModal={setModal}
          setModalDeleteProduct={setModalDeleteProduct}
          setProducts={setProducts}
        />
      )}
    </Modal>
  ) : (
    <div>
      <MainAdmin />
      {showAddAndSearch && (
        <div>
          <button className={"btn btn-success"} onClick={handleAddProduct}>
            Add
          </button>
          <SelectProductsCodes
            setProductCode={setProductCode}
            setModal={setModal}
            setModalSearchProduct={setModalSearchProduct}
          />
        </div>
      )}
      <h3>Todos los productos:</h3>
      <table className="table table-light table-hover">
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
                  handleActivate={handleActivate}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
