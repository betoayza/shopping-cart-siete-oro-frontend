import axios from "axios";
import React, { useState } from "react";
import { OrdersTable } from "./OrdersTable";

const OrderByCode = () => {
  const [order, setOrder] = useState(null);
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "/api/user/orders/code",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      params: { code },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Pedido encontrado! :) ");
          setOrder(res.data);
        } else {
          alert("Pedido no encontrado :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleReset();
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleReset = () => {
    setCode("");
  };

  return (
    <>
      <h1>Pedido:</h1>

      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <input
              type="number"
              className="form-control"
              name="code"
              placeholder="Codigo..."
              value={code}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Enviar
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
      {order && <OrdersTable orders={order} />}
    </>
  );
};

export default OrderByCode;
