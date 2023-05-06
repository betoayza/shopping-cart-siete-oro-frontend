import React, { useState, useEffect } from "react";
import { ProductsTable } from "../../components/container/ProductsTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await helpAxios().getAllProducts();
      console.log(allProducts);

      if (allProducts instanceof Error) setIsError(true);
      else {
        setProducts(allProducts);
        setIsError(false);
      }

      setIsLoading(false);
    };

    getAllProducts();
  }, [products]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={"h-auto vw-100 text-center"}>
      {isError ? (
        <h2>
          <span style={{ color: "maroon" }}>Error en la conexión :(</span>
        </h2>
      ) : products && products.length ? (
        <ProductsTable products={products} setProducts={setProducts} />
      ) : (
        <h2>No hay productos :(</h2>
      )}
    </div>
  );
};

export default AllProducts;
