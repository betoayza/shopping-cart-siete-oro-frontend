import React, { useState } from "react";
import { OrderTableRowUser } from "./OrderTableRowUser";
// import { useParams } from "react-router-dom";

export const OrdersTableUser = ({ orders, setOrders }) => {
  const [orderProducts, setOrderProducts] = useState(null);
  // const params = useParams();
  // const { userCode } = params;

  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  const handleSeeOrder = (orderProducts) => {
    setOrderProducts(orderProducts);
  };

  return (
    <div>    

      <h2>Mis pedidos:</h2>

      <table className={"table table-hover"}>
        <thead>
          <tr>
            <th scope="col">Codigo</th>
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
              return (
                <OrderTableRowUser
                  key={order._id}
                  order={order}
                  handleSeeOrder={handleSeeOrder}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
