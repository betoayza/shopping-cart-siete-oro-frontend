import React, { useState, useEffect, useCallback } from "react";
import { OrdersTable } from "../../components/container/OrdersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 3000;

  const getAllOrders = useCallback(async () => {
    try {
      const allOrders = await helpAxios().getAllOrders();

      console.log(allOrders);

      if (
        Object.prototype.toString.call(allOrders) === "[object Error]" ||
        allOrders.name === "AxiosError"
      )
        throw new Error();

      setOrders(allOrders);
      // setIsError(false);
    } catch (error) {
      console.error("asdasdadajsda");
      // setIsError(true);
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

  // return isError ? (
  //   <Loader />
  // ) :

  return (
    <div className={"vw-100 h-auto"}>
      {orders.length ? (
        <OrdersTable orders={orders} setOrders={setOrders} />
      ) : (
        <h2>No hay órdenes aún :(</h2>
      )}
    </div>
  );
};
