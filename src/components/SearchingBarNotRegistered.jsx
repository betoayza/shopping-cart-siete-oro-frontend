import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { ProductsTableNotUsers } from "./ProductsTableNotUsers";

export const SearchingBarNotRegistered = () => {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const options = {
        url: "/api/products/get",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { term },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
          }
        })
        .catch((error) => error);
    };
    if (term !== "") getProducts();
    else setProducts(null);
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"text-center searching-bar-div"}>
      <h1>Panadería Siete de Oro</h1>
      <input
        className={"form-control w-50"}
        value={term}
        placeholder={"¿Qué está buscando?..."}
        onChange={handleChange}
      />
      {products ? (
        <Modal>
          <div className={"w-100"}>
            <div className={"d-flex justify-content-center"}>
              <input
                className={"form-control"}
                style={{ width: "100%" }}
                value={term}
                placeholder={"¿Qué está buscando?..."}
                onChange={handleChange}
              />
            </div>
            {products.length ? (
              <ProductsTableNotUsers products={products} />
            ) : (
              <h2>Sin resultados :(</h2>
            )}
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
