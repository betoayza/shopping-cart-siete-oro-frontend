import React, { useState, useEffect } from "react";
import { ProductTableRow } from "./ProductTableRow";
import { ModifyProduct } from "./ModifyProduct";
import { Modal } from "./Modal";
import axios from "axios";
import { SelectProductsCodes } from "./SelectProductsCodes";
import { SearchProductByCode } from "./SearchProductByCode";
import { AddProduct } from "./AddProduct";

export const ProductsTable = ({
  products,
  setProducts,
  addAndSearch = true,
}) => {
  const [modal, setModal] = useState(false);
  const [productCode, setProductCode] = useState(null);
  const [productDelCode, setProductDelCode] = useState(null);
  const [modalSearchProduct, setModalSearchProduct] = useState(false);
  const [modalModifyProduct, setModalModifyProduct] = useState(false);
  const [showAddAndSearch, setShowAddAndSearch] = useState(addAndSearch);
  const [modalAddProduct, setModalAddProduct] = useState(false);

  if (!Array.isArray(products)) {
    products = [products];
  }

  const handleUpdate = (prodCode) => {
    setModal(true);
    setProductCode(prodCode);
    setModalModifyProduct(true);
  };

  const handleDelete = (prodCode) => {
    setProductDelCode(prodCode);
  };

  useEffect(() => {
    const code = productDelCode;
    const deleteProduct = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { code },
      };

      await axios
        .delete("/api/admin/products/delete", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            alert("Baja exitosa!");

            const getAllProducts = async () => {
              const options = {
                url: "/api/products/all",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "*",
                  Accept: "application/json",
                },
                timeout: 3000,
              };
  
              await axios
                .request(options)
                .then((res) => {
                  console.log(res.data);
                  if (res.data) {
                    setProducts(res.data);
                  } else return;
                })
                .catch((error) => error);
            };
            getAllProducts();
          } else return;
        })
        .catch((error) => error);
    };
    deleteProduct();
  }, [productDelCode]);

  const handleAddProduct = () => {
    setModal(true);
    setModalAddProduct(true);
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
    </Modal>
  ) : (
    <div>
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
      <h3>Todso los productos:</h3>
      <table id="products-table" className="table table-dark">
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
    </div>
  );
};
