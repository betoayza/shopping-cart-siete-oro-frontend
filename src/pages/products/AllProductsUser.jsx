import React, { useState, useEffect, useCallback } from "react";
import { ProductsTableUsers } from "../../components/container/ProductsTableUsers";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const AllProductsUser = ({ code, username }) => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 3000;

  const getAvailableProducts = useCallback(async () => {
    try {
      const allActiveProducts = await helpAxios().getAllActiveProducts();
      const availableProducts = allActiveProducts.filter(
        (product) => product.stock > 0
      );

      setProducts(availableProducts);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAvailableProducts();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getAvailableProducts]);

  return isError ? (
    <Loader />
  ) : (
    <div className={"h-auto vw-100 text-center"}>
      {products.length ? (
        <ProductsTableUsers
          products={products}
          setProducts={setProducts}
          userCode={code}
          showButton={true}
          username={username}
        />
      ) : (
        <h2>No hay productos :(</h2>
      )}
    </div>
  );
};

export default AllProductsUser;
