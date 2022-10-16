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

  return (
    <div className={"searching-bar w-100"}>
      <div className={""} style={{ width: "400px" }}>
        <input
          type="text"
          value={term}
          placeholder={"Buscar..."}
          onChange={handleChange}
          className={"form-control w-100"}
        />
      </div>

      {products && term !== "" && (
        <div className={"w-100"}>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
          />
        </div>
      )}
    </div>
  );
};
