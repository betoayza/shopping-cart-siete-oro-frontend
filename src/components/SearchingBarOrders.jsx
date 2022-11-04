import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrdersTable } from "./OrdersTable";
import { API } from "../api/api";

export const SearchingBarOrders = ({
  term,
  setTerm,
  setModal,
  setModalSearchOrder,
}) => {
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
        .get(`${API}/admin/orders/search`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrders(res.data);
            setModal(true);
            setModalSearchOrder(true);
          } else {
            setOrders([]);
          }
        })
        .catch((error) => error);
    };
    if (term !== "") {
      getOrders();
    } else {
      setModal(false);
      setModalSearchOrder(false);
      setOrders(null);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"searching-bar"}>
      <div className={"w-50"}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          className={"form-control w-100"}
          placeholder={"Buscar..."}
        />
      </div>

      {orders && term !== "" && (
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          showSearchingBar={false}
        />
      )}
    </div>
  );
};
