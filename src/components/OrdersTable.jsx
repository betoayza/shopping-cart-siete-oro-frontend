import React from "react";
import { OrderTableRow } from "./OrderTableRow";

export const OrdersTable = ({ orders, setOrders }) => {
  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  const handleCloseTable = () => {
    setOrders(null);
  };

  return (
    <div>
      <h1>Pedidos encontrados</h1>
      <table id="orders-table" className="table table-success">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Usuario</th>
            <th scope="col">Productos</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return <OrderTableRow key={order._id} order={order} />;
            })}
        </tbody>
      </table>
      <button
        className="btn btn-danger"
        type="reset"
        onClick={handleCloseTable}
      >
        Close
      </button>
    </div>
  );
};
