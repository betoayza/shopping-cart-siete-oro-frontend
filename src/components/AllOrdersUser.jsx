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
  const { code } = params;

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
    <div className={"nav-bar"}>
      {console.log(code)}
      <NavBarUser code={code} />
      {orders ? (
        <div>
          <OrdersTableUser
            orders={orders}
            setOrders={setOrders}
            userCode={code}
          />
        </div>
      ) : (
        <h2>No hay pedidos :(</h2>
      )}
    </div>
  );
};
