import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrdersTable } from "./OrdersTable";
import { API } from "../api/api";

export const OrdersSearchingBar = ({
  orders,
  setOrders,
  setModal,
  setModalSearchOrders,
}) => {
  const [term, setTerm] = useState("");

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
          if (res.data) setOrders(res.data);
        })
        .catch((error) => error);
    };
    getOrders();
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setModal(false);
    setModalSearchOrders(false);
    setTerm(null);
  };

  return (
    <div className={"searching-bar"}>
      <div>
        <input
          type={"text"}
          placeholder={"Buscar..."}
          className={"form-control w-100"}
          value={term}
          onChange={handleChange}
        />
      </div>

      {!term && (
        <button
          type={"button"}
          className={"btn btn-danger"}
          onClick={handleClose}
        >
          Cerrar
        </button>
      )}

      {orders && term !== "" && (
        <>
          <OrdersTable
            orders={orders}
            setOrders={setOrders}
            showSearchUserAndAdminNavBar={false}
          />
          <button
            type={"button"}
            className={"btn btn-danger"}
            onClick={handleClose}
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
};
