import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductsTable } from "./ProductsTable";

export const ProductsSearchingBar = ({
  term,
  setTerm,
  setModal,
  setModalSearchProduct,
}) => {
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
            setModal(true);
            setModalSearchProduct(true);
          } else {
            setProducts([]);
          }
        })
        .catch((error) => error);
    };

    if (term !== "") getProduct();
    else {
      setProducts(null);
      setModal(false);
      setModalSearchProduct(false);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return products && term !== "" ? (
    <div
      className={
        "w-100 vh-100 border justify-content-center align-items-center "
      }
    >
      <div className={"w-100 border d-flex justify-content-center"}>
        <input
          type="text"
          value={term}
          placeholder={"Buscar..."}
          onChange={handleChange}
          className={"form-control w-50"}
        />
      </div>
      <div>
        <ProductsTable
          products={products}
          setProducts={setProducts}
          addAndSearch={false}
        />
      </div>
    </div>
  ) : (
    <div id="searching-bar-product-div">
      <div className={"w-50"}>
        <input
          type="text"
          value={term}
          placeholder={"Buscar..."}
          onChange={handleChange}
          className={"form-control w-100"}
        />
      </div>
    </div>
  );
};
