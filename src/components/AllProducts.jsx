import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductsTable } from "./ProductsTable";

const AllProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const options = {
      url: "/api/products/all",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      params: { products },
      timeout: 3000,
    };
    const getAllProducts = async () => {
      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
            alert("Productos encontrados!");
          } else {
            alert("Por el momento no hay productos :(");
          }
        })
        .catch((error) => error);
    };

    getAllProducts();
  }, []);

  return (
    <div>
      <h3>Productos: </h3>
      {products && <ProductsTable products={products} />}
    </div>
  );
};

export default AllProducts;
