import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTable } from "./OrdersTable";

export const AllOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
      };

      await axios
        .get("/api/admin/orders/all", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setOrders(res.data);
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, []);

  return (
    <div className={"w-100 vh-100"}>{orders && <OrdersTable orders={orders} setOrders={setOrders} />}</div>
  );
};
