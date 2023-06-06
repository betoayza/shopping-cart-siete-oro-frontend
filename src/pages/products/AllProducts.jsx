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
      
      setProducts(allProducts);
      setIsError(false);
    } catch {
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
