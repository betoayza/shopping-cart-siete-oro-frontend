import React, { useState, useEffect, useCallback } from "react";
import { ShoppingCartTable } from "../../components/container/ShoppingCartTable";
import { useParams } from "react-router-dom";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState({ products: [] });
  const [isError, setIsError] = useState(false);
  const params = useParams();
  const { userCode, username } = params; //userCode = shoppingCart.code
  const intervalTime = 3000;

  const getShoppingCart = useCallback(async (userCode) => {
    try {
      const userShoppingCart = await helpAxios().getShoppingCart(userCode);

      if (Object.prototype.toString.call(userShoppingCart) === "[Object Error]")
        throw new Error();

      setShoppingCart(userShoppingCart);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getShoppingCart(userCode);
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getShoppingCart]);

  return isError ? (
    <Loader />
  ) : (
    <div className={"h-100 w-100"}>
      <NavBarUser
        code={userCode}
        counterCart={shoppingCart.products.length}
        username={username}
      />

      <h1>Mi carrito</h1>

      {shoppingCart.products.length ? (
        <ShoppingCartTable
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
          userCode={userCode}
        />
      ) : (
        <div className={"d-grid align-items-center"} style={{ height: "80%" }}>
          <h3 style={{ color: "maroon" }}>Carrito vacío</h3>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
