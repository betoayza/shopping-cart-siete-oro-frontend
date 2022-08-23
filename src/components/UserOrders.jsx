import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTableUser } from "./OrdersTableUser";
import { useParams } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  const params = useParams();
  const { code } = params;

  useEffect(() => {
    const getUserOrders = async () => {
      const options = {
        url: "/api/user/orders/all",

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
          } 
        })
        .catch((error) => error);
    };
    getUserOrders();
  }, []);

  return (
    <div>      
      {orders && <OrdersTableUser orders={orders} setOrders={setOrders}/>}
    </div>
  );
};

export default UserOrders;
