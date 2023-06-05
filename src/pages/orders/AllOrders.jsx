import React, { useState, useEffect, useCallback } from "react";
import { OrdersTable } from "../../components/container/OrdersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 3000;

  const getAllOrders = useCallback(async () => {
    setIsError(false);
    try {
      const allOrders = await helpAxios().getAllOrders();

      setOrders(allOrders);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllOrders();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getAllOrders, intervalTime]);

  return isError ? (
    <Loader />
  ) : (
    <div className={"vw-100 h-auto"}>
      {orders.length ? (
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          isLoadingActivated={false}
        />
      ) : (
        <h2>No hay órdenes aún :(</h2>
      )}
    </div>
  );
};
