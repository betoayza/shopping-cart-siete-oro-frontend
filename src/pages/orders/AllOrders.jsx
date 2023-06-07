import React, { useState, useEffect, useCallback } from "react";
import { OrdersTable } from "../../components/container/OrdersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 5000;

  const getAllOrders = useCallback(async () => {    
    try {
      const allOrders = await helpAxios().getAllOrders();

      if(Object.prototype.toString.call(allOrders) === "[object Error]")
        throw new Error()

      setOrders(allOrders);
      setIsError(false);      
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    // first call doesn't delay
    const fetchData = async () => {
      await getAllOrders();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getAllOrders]);

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
