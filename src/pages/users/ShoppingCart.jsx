import React, { useState, useEffect } from "react";
import { ShoppingCartTable } from "../../components/container/ShoppingCartTable";
import { useParams } from "react-router-dom";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const params = useParams();
  const { userCode, username } = params; //userCode = shoppingCart.code

  useEffect(() => {
    const getShoppingCart = async (userCode) => {
      const userShoppingCart = await helpAxios().getShoppingCart(userCode);

      if (userShoppingCart instanceof Error) setIsError(true);
      else setShoppingCart(userShoppingCart);

      setIsLoading(false);
    };

    userCode && getShoppingCart(userCode);
  }, [userCode]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2 className="text-center">Error en la conexión :(</h2>
  ) : (
    <div className={"h-100 w-100"}>
      <NavBarUser
        code={userCode}
        counterCart={shoppingCart.products.length || 0}
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
