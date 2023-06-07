import React, { useState, useEffect, useCallback } from "react";
import { OrdersTableUser } from "../../components/container/OrdersTableUser";
import { useParams } from "react-router-dom";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllOrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);
  const intervalTime = 3000;
  const params = useParams();
  const { code, username } = params;

  const getAllUserOrders = useCallback(async () => {
    try {
      const allOrders = await helpAxios().getAllUserOrders(code);

      if (Object.prototype.toString.call(allOrders) === "[object Error]")
        throw new Error();

      setOrders(allOrders);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllUserOrders();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getAllUserOrders]);

  return isError ? (
    <Loader />
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
