import React, { useState, useEffect } from "react";
import { OrdersTable } from "../../components/container/OrdersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await helpAxios().getAllOrders();

      if (allOrders instanceof Error) setIsError(true);
      else setOrders(allOrders);

      setIsLoading(false);
    };

    getAllOrders();
  }, []);

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
