import React, { useState, useEffect } from "react";
import { OrdersTableUser } from "../../components/container/OrdersTableUser";
import { useParams } from "react-router-dom";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const params = useParams();
  const { code, username } = params;

  useEffect(() => {
    const interval = setInterval(() => {
      getAllUserOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAllUserOrders = async () => {
    try {
      const allOrders = await helpAxios().getAllUserOrders(code);

      // if (allOrders instanceof Error) setIsError(true);

      setOrders(allOrders);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2>Error en la conexión :(</h2>
  ) : (
    <div>
      <NavBarUser code={code} counterCart={0} username={username} />
      <h1>Mis pedidos</h1>
      {orders.length ? (
        <div>
          <OrdersTableUser
            orders={orders}
            setOrders={setOrders}
            userCode={code}
            username={username}
          />
        </div>
      ) : (
        <div className={"d-grid align-items-center"} style={{ height: "88%" }}>
          <h3 style={{ color: "maroon" }}>No hay pedidos</h3>
        </div>
      )}
    </div>
  );
};
