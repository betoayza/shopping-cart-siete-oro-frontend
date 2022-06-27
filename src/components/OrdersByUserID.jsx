import axios from "axios";
import React, {useState} from "react";
import { OrdersTable } from "./OrdersTable";

const OrdersByUserID = () => {
  const [orders, setOrders] = useState(null);
  const [code, setCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uri = "/admin/orders/by-user-id";
    await axios
      .get(uri, {code})
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          console.log("Pedidos encontrado! :) ");
          setOrders(res.data);
        } else {
          alert("Pedidos no encontrados :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      handleReset();
  };

  const handleChange=e=>{
    setCode(e.target.value);
  };

  const handleReset=()=>{
    setCode(null);
  };

  return (
    <>
      <h1>Pedidos por ID de usuario:</h1>

      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <input
              type="number"
              className="form-control"
              name="code"
              placeholder="Code..."
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
      {orders && <OrdersTable data={orders} />}
    </>
  );
};

export default OrdersByUserID;
