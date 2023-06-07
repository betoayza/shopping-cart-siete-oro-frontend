import React, { useState, useEffect, useCallback } from "react";
import { ProductsTable } from "../../components/container/ProductsTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [isError, setIsError] = useState(true);

  const getAllProducts = useCallback(async () => {
    try {
      const allProducts = await helpAxios().getAllProducts();

      if (Object.prototype.toString.call(allProducts) === "[object Error]")
        throw new Error();

      setProducts(allProducts);
      setIsError(false);
    } catch {
      console.error("SE ATRAPÓ EL ERROR");
      setIsError(true);
    } finally {
      setIsError(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllProducts();
    };
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [getAllProducts]);

  return isError ? (
    <Loader />
  ) : !products ? (
    setIsError(true)
  ) : (
    <div className={"h-auto vw-100 text-center"}>
      {products.length ? (
        <ProductsTable products={products} setProducts={setProducts} />
      ) : (
        <h2>No hay productos :(</h2>
      )}
    </div>
  );
};

export default AllProducts;
