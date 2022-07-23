import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTable } from "./OrdersTable";
import { useParams } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  const params = useParams();
  const { code } = params;

  useEffect(() => {
    const getUserOrders = async () => {
      const options = {
        url: "/api/user/orders",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        params: { code },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrders(res.data);
            alert("Pedidos encontrados!");
          } else {
            alert("Todavía no tiene pedidos hechos :(");
          }
        })
        .catch((error) => error);
    };
    getUserOrders();
  }, []);

  return (
    <div className="responsible-table" id="user-orders-div">
      <h3>Todos sus pedidos:</h3>
      {orders && <OrdersTable orders={orders} setOrders={setOrders}/>}
    </div>
  );
};

export default UserOrders;
