import React, { useState } from "react";
import { OrdersTable } from "./OrdersTable";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UserOrderByCode = () => {
  const [orderCode, setOrderCode] = useState("");
  const [order, setOrder] = useState(null);
  const params = useParams();
  const { userCode } = params;

  const handleChange = (e) => {
    setOrderCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: `/api/user/orders/code`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      params: { orderCode, userCode },
      timeout: 3000,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setOrderCode(res.data);
          alert("Pedido encontrado!");
        } else alert("Pedido no encontrado :(");
      })
      .catch((error) => error);
    handleReset();
  };

  const handleReset = (e) => {
    setCode("");
  };

  return (
    <>
      <h3>Codigo de pedido:</h3>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              name="orderCode"
              placeholder="Codigo..."
              value={orderCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Buscar!
            </button>
          </div>

          <div className="col-12">
            <button
              className="btn btn-danger"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <h2>Pedido:</h2>
      {order && <OrdersTable orders={order} setOrders={setOrder} />}
    </>
  );
};
