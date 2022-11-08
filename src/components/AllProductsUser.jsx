import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { Loader } from "./Loader";
import { API } from "../api/api";

const AllProductsUser = ({ code, username }) => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      const options = {
        url: `${API}/products/all`,
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
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    getAllProducts();
  }, [products]);

  return loader ? (
    <Loader />
  ) : (
    <div className={"vh-100 vw-100"}>
      {products ? (
        <ProductsTableUsers
          products={products}
          setProducts={setProducts}
          userCode={code}
          showButton={true}
          username={username}
        />
      ) : (
        <h2>No hay productos</h2>
      )}
    </div>
  );
};

export default AllProductsUser;
