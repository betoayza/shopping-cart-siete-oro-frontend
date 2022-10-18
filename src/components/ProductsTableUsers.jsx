import axios from "axios";
import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { ProductCard } from "./ProductCard";

export const ProductsTableUsers = ({
  products,
  userCode,
  showButton = true,
  username
}) => {
  const [loader, setLoader] = useState(true);  

  // useEffect(() => {    
  //   const getShoppingCart = async () => {
  //     const options = {
  //       url: "/api/user/shopping-cart",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Accept: "application/json",
  //       },
  //       params: { userCode },
  //       timeout: 3000,
  //     };

  //     await axios
  //       .request(options)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data) setProducts(res.data.products);          
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   getShoppingCart();
  // }, [products]);


  if (!Array.isArray(products)) {
    products = [products];
  }

  useEffect(() => {
    if (products) setLoader(false);
  }, [loader, products]);

  return loader ? (
    <Loader />
  ) : products.length ? (
    <div className={"vw-75 p-3"}>
      {products.length === 1 ? <h3>Producto:</h3> : <h3>Productos:</h3>}
      <div className={"products-list"}>
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              index={index}
              product={product}             
              userCode={userCode}
              showButton={showButton}
              username={username}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <h2>Sin resultados :(</h2>
  );
};
