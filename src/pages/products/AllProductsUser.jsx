import React, { useState, useEffect } from "react";
import { ProductsTableUsers } from "../../components/container/ProductsTableUsers";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const AllProductsUser = ({ code, username }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAvailableProducts = async () => {
      const allActiveProducts = await helpAxios().getAllActiveProducts();

      if (allActiveProducts instanceof Error) setIsError(true);
      else {
        const availableProducts = allActiveProducts.filter(
          (product) => product.stock > 0
        );

        setProducts(availableProducts);
        setIsError(false);
      }

      setIsLoading(false);
    };

    getAvailableProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h3 style={{ color: "maroon" }}>Error en la conexión :(</h3>
  ) : (
    products && (
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
    )
  );
};

export default AllProductsUser;
