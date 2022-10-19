import React, { useState, useEffect } from "react";
import { OrdersTableUser } from "./OrdersTableUser";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";
import { Loader } from "./Loader";

export const AllOrdersUser = () => {
  const [orders, setOrders] = useState(null);
  const [loader, setLoader] = useState(true);

  const params = useParams();
  const { code, username } = params;

  useEffect(() => {
    const getAllOrders = async () => {
      const userCode = code;
      const options = {
        url: `/api/user/orders/all`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { userCode },
        timeout: 3000,
      };

      await axios
        .request(options)
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
    <div className={"vh-100"}>
      {console.log(code)}
      <NavBarUser code={code} username={username} />
      <h1>Mis pedidos</h1>
      {orders.length ? (
        <div>
          <OrdersTableUser
            orders={orders}
            setOrders={setOrders}
            userCode={code}
          />
        </div>
      ) : (
        <div className={"d-grid align-items-center"} style={{ height: "88%" }}>
          <h3>No hay pedidos :(</h3>
        </div>
      )}
    </div>
  );
};
