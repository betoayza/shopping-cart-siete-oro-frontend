import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTable } from "./ProductsTable";

export const SearchProductByCode = ({
  code,
  setModal,
  setModalSearchProduct,
}) => {
  const [product, setProduct] = useState(null);

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
          if (res.data) setProduct(res.data);
          else alert("Producto inexistente :(");
        })
        .catch((error) => error);
    };
    getProduct();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalSearchProduct(false);
  };

  return (
    <div>
      {product && <ProductsTable products={product} setProducts={setProduct} />}
      <button className={"btn btn-danger"} onClick={handleClose}>
        Close
      </button>
    </div>
  );
};
