import React, { useState, useEffect } from "react";
import { OrdersTable } from "../../components/container/OrdersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAllOrders = async () => {
    try {
      const allOrders = await helpAxios().getAllOrders();

      // if (allOrders instanceof Error) setIsError(true);

      setOrders(allOrders);
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
  ) : orders.length ? (
    <div className={"vw-100 h-auto"}>
      {orders && (
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          isLoadingActivated={false}
        />
      )}
    </div>
  ) : (
    <h2>No hay órdenes aún :(</h2>
  );
};
