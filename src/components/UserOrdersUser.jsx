import React, { useState, useEffect } from "react";
import { OrdersTableUser } from "./OrdersTableUser";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";

export const UserOrdersUser = () => {
  const [orders, setOrders] = useState(null);
  const params = useParams();
  const { code } = params;

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        url: `/api/user/orders`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { code },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrder(res.data);
          }
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, []);

  return orders ? (
    <div className={"nav-bar"}>
      {console.log(code)}
      <NavBarUser code={code} />
      <h2>Pedidos:</h2>
      {order && <OrdersTableUser orders={orders} setOrders={setOrders} />}
    </div>
  ) : (
    <div className={"nav-bar"}>
      <NavBarUser code={code} />
      <h2>No hay pedidos :(</h2>
    </div>
  );
};
