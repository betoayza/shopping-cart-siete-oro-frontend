import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTable } from "./ProductsTable";

export const SearchProductByCode = ({
  code,
  setModal,
  setModalSearchProduct,
}) => {
  const [product, setProduct] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { code },
      };

      await axios
        .get("/api/admin/products/search/code", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProduct(res.data);
            setFound(true);
          }
        })
        .catch((error) => error);
    };
    getProduct();
  }, [product]);

  const handleClose = () => {
    setModal(false);
    setModalSearchProduct(false);
    setFound(false);
  };

  return found ? (
    <>
      {product && (
        <ProductsTable
          products={product}
          setProducts={setProduct}
          addAndSearch={false}
        />
      )}
      <button className={"btn btn-danger"} onClick={handleClose}>
        Close
      </button>
    </>
  ) : (
    <>
      <h3>No encontrado :(</h3>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Close
      </button>
    </>
  );
};
