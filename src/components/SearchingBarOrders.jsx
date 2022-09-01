import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrdersTable } from "./OrdersTable";


export const SearchingBarOrders = ({ setModal, setModalSearchOrder }) => {
  const [term, setTerm] = useState("");
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { term },
      };

      await axios
        .get("/api/admin/orders/search", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setOrders(res.data);
        })
        .catch((error) => error);
    };
    getOrders();
  }, [term, orders]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setModal(false);
    setModalSearchOrder(false);
    setOrders(null);
    setTerm("");
  };

  return (
    <>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        className={"form-control w-25"}
        placeholder={"Buscar..."}
      />

      {!term && (
        <button
          type={"button"}
          className={"btn btn-danger"}
          onClick={handleClose}
        >
          Close
        </button>
      )}

      {orders && term !== "" && (
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          showSearchingBar={false}
        />
      )}
    </>
  );
};
