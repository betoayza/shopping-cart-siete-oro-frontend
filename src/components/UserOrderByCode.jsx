import React, { useState } from "react";
import { OrdersTable } from "./OrdersTable";
import axios from "axios";

export const UserOrderByCode = () => {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    setCode(e.target.value);
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
      params: { code },
      timeout: 3000,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log(res.data);
          setOrder(res.data);
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
              name="code"
              placeholder="Codigo..."
              value={code}
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
      {order && <OrdersTable orders={order} />}
    </>
  );
};