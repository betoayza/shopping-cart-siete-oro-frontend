import React, { useState } from "react";
import { OrdersTable } from "./OrdersTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";

export const UserOrdersUser = () => {
  const [orderCode, setOrderCode] = useState("");
  const [order, setOrder] = useState(null);
  const params = useParams();
  const { code } = params;

  const handleChange = (e) => {
    setOrderCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          alert("Pedido encontrado!");
        } else alert("Pedido no encontrado :(");
      })
      .catch((error) => error);
    handleClean();
  };

  const handleClean = (e) => {
    setOrderCode("");
  };

  return (
    <>
      {console.log(code)}
      <NavBarUser code={code} />
      <h2>Pedidos:</h2>
      {order && <OrdersTableUser orders={order} setOrders={setOrder} />}
    </>
  );
};
