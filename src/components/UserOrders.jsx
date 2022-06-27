import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTable } from "./OrdersTable";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const uri = "/user/orders/all";
      await axios
        .get(uri)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setOrders(res.data);
            alert("Pedidos encontrados!");
          } else {
            alert("El usuario todavía no tiene pedidos hechos :(");
          }
        })
        .catch((error) => error);
    };
    getOrders();
  }, []);

  return (
    <div className="responsible-table" id="user-orders-div">
      {orders && <OrdersTable orders={orders} />}
    </div>
  );
};

export default UserOrders;
