import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTable } from "./ProductsTable";
import { Loader } from "./Loader";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
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
      {products && (
        <ProductsTable products={products} setProducts={setProducts} />
      )}
    </div>
  );
};

export default AllProducts;
