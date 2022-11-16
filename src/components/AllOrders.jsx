import React, { useState, useEffect } from "react";
import axios from "axios";
import { OrdersTable } from "./OrdersTable";
import { Loader } from "./Loader";
import { API } from '../api/api';

export const AllOrders = () => {
  const [orders, setOrders] = useState(null);
  const [loader, setLoader] = useState(true);

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
        .get(`${API}/admin/orders/all`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrders(res.data);
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, [orders]);

  return loader ? (
    <Loader />
  ) : (
    <div className={"vw-100 h-auto"}>
      {orders && <OrdersTable orders={orders} setOrders={setOrders} />}
    </div>
  )
};
