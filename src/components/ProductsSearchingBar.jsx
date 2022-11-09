import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductsTable } from "./ProductsTable";
import { API } from "../api/api";

export const ProductsSearchingBar = ({
  term,
  setTerm,
  setModal,
  setModalSearchProduct,
  isModalStyle = false,
}) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const options = {
        url: `${API}/admin/products/search`,
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
    <div className={"searching-bar"}>
      <div className={"row row-cols-1"} style={{ width: "50%" }}>
        <input
          type="text"
          value={term}
          placeholder={"Buscar..."}
          onChange={handleChange}
          className={"form-control col col-md-auto"}
        />
      </div>

      {products && term !== "" && (
        <div className={"vw-100 col col-md-auto"}>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
            isModalStyle={isModalStyle}
          />
        </div>
      )}
    </div>
  );
};
