import axios from "axios";
import React, { useState, useEffect } from "react";

export const SelectOrdersCodes = ({
  setOrderCode,
  setModal,
  setModalSearchOrder,
}) => {
  const [selected, setSelected] = useState("");
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        url: "/api/orders/all",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setOrders(res.data);
        })
        .catch((error) => error);
    };
    getAllOrders();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setOrderCode(e.target.value);
    setModal(true);
    setModalSearchOrder(true);
  };

  return (
    <div>
      <label>
        Buscar:{" "}
        <select
          className={"form-select"}
          value={selected}
          onChange={handleChange}
        >
          <option value="">---</option>
          {orders &&
            orders.map((order) => (
              <option key={order._id} value={order.code}>
                {order.code}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};
