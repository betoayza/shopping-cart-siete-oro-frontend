import React, { useState, useEffect } from "react";
import { OrdersTableUser } from "../../components/container/OrdersTableUser";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Loader } from "../../components/pure/Loader";

export const AllOrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  const params = useParams();
  const { code, username } = params;

  useEffect(() => {
    const getAllOrders = async () => {
      const userCode = code;
      const options = {
        url: `${import.meta.env.VITE_API}/user/orders/all`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { userCode },
        timeout: 3001,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrders(res.data);
            setLoader(false);
          } else {
            setOrders([]);
            setLoader(true);
          }
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, [orders]);

  return loader ? (
    <Loader />
  ) : (
    <div
      className={"h-auto"}
      // style={{minHeight: "100vh"}}
    >
      {console.log(code)}
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
          <h3 style={{ color: "red" }}>No hay pedidos</h3>
        </div>
      )}
    </div>
  );
};