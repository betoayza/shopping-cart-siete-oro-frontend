import React, { useState } from "react";
import { OrderTableRow } from "./OrderTableRow";
import { SelectOrdersCodes } from "./SelectOrdersCodes";

export const OrdersTable = ({ orders, setOrders }) => {
  const [orderCode, setOrderCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalSearchOrder, setModalSearchOrder] = useState(false);

  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  return (
    <div>
      <SelectOrdersCodes
        setOrderCode={setOrderCode}
        setModal={setModal}
        setModalSearchOrder={setModalSearchOrder}
      />
      <h3>Todos los pedidos:</h3>
      <div className={"table-responsive"}>
        <table id="orders-table" className={"table table-light table-hover"}>
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Usuario</th>
              <th scope="col">Productos</th>
              <th scope="col">Monto</th>
              <th scope="col">Fecha</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return <OrderTableRow key={order._id} order={order} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
