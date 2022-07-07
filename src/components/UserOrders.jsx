import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTable } from "./OrdersTable";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        url: "/api/user/orders/all",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setOrders(res.data);
            alert("Pedidos encontrados!");
          } else {
            alert("Todavía no tiene pedidos hechos :(");
          }
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, [orders]);

  return (
    <div className="responsible-table" id="user-orders-div">
      {orders && <OrdersTable orders={orders} />}
    </div>
  );
};

export default UserOrders;
