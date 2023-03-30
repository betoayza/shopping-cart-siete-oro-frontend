import React, { useState, useEffect } from "react";
import { ProductsTable } from "../../components/container/ProductsTable";
import { Loader } from "../../components/pure/Loader";
import { helpFetchs } from "../../helpers/helpFetchs";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const result = helpFetchs().getAllProducts();

    if (result) {
      setProducts(result);
      setLoader(false);
    }
  }, []);

  return loader ? (
    <Loader />
  ) : (
    products && (
      <div className={"h-auto vw-100 text-center"}>
        {products ? (
          <ProductsTable products={products} setProducts={setProducts} />
        ) : (
          <h2>No hay productos</h2>
        )}
      </div>
    )
  );
};

export default AllProducts;
