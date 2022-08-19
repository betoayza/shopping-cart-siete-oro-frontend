import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTable } from "./ProductsTable";

const AllProducts = () => {
  const [products, setProducts] = useState(null);

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
          } else return;
        })
        .catch((error) => error);
    };
    getAllProducts();
  }, [products]);

  return (
    <div>      
      {products && (
        <ProductsTable products={products} setProducts={setProducts} />
      )}
    </div>
  );
};

export default AllProducts;
