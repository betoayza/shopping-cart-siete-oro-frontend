import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductsTable } from "./ProductsTable";

export const ProductsSearchingBar = ({ setModal, setModalSearchProduct }) => {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const options = {
        url: "/api/admin/products/search",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        params: { term },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
          } else setProducts(null);
        })
        .catch((error) => error);
    };
    getProduct();
  }, [term]);

  const handleClose = () => {
    setModal(false);
    setModalSearchProduct(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div id="searching-bar-product-div">
      <input
        type="text"
        value={term}
        placeholder={"Buscar..."}
        onChange={handleChange}
        className={"form-control w-100"}
      />
      <br />
      {!term && (
        <button
          type="button"
          className={"btn btn-danger"}
          onClick={handleClose}
        >
          Cerrar
        </button>
      )}

      {products && term !== "" && (
        <>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
          />
          <button
            type="button"
            className={"btn btn-danger"}
            onClick={handleClose}
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
};
