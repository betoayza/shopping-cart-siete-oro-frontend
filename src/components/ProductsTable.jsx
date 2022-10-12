import React, { useState } from "react";
import { ProductTableRow } from "./ProductTableRow";
import { ModifyProduct } from "./ModifyProduct";
import { Modal } from "./Modal";
import { AddProduct } from "./AddProduct";
import { ActivateProduct } from "./ActivateProduct";
import DeleteProduct from "./DeleteProduct";
import { ProductsSearchingBar } from "./ProductsSearchingBar";
import { NavBarAdmin } from "./NavBarAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  const [term, setTerm] = useState("");

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
        <ProductsSearchingBar
          term={term}
          setTerm={setTerm}
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
    <div className={"w-100"}>
      {showAddAndSearch && (
        <div className={""}>
          <NavBarAdmin />
          <button className={"btn btn-success w-10"} onClick={handleAddProduct}>
            <i
              className="bi-plus-lg"
              style={{ color: "white", fontSize: "20px" }}
            ></i>
          </button>

          <ProductsSearchingBar
            term={term}
            setTerm={setTerm}
            products={products}
            setProducts={setProducts}
            setModal={setModal}
            setModalSearchProduct={setModalSearchProduct}
          />
        </div>
      )}
      <div className={"d-flex justify-content-center"}>
        {products.length ? (
          <div className={"border"}>
            {products.length === 1 ? <h2>Producto:</h2> : <h2>Productos:</h2>}
            <div className={"table-responsive"}>
              <table className={"table table-light table-hover table-sm"}>
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
                  {products.map((product, index) => {
                    return (
                      <ProductTableRow
                        key={index}
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
          </div>
        ) : (
          <h2>No hay productos :(</h2>
        )}
      </div>
    </div>
  );
};
