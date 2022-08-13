import axios from "axios";
import React, { useState } from "react";
import { OrdersTable } from "./OrdersTable";

const OrderByCode = () => {
  const [order, setOrder] = useState(null);
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "/api/admin/orders/code",

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
    handleClean();
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleClean = () => {
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
                Send
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={handleClean}
              >
                Clean
              </button>
            </div>
          </div>
        </form>
      </div>
      {order && <OrdersTable orders={order} setOrders={setOrder} />}
    </>
  );
};

export default OrderByCode;
