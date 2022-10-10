import React from "react";

export const OrderTableRowUser = ({
  order,
  handleSeeItems,
  handleCancelOrder,
  handleActivateOrder,
}) => {
  return (
    <tr>
      <td>{order.code}</td>
      <td>
        <button
          className="btn btn-dark"
          onClick={() => handleSeeItems(order.products)}
        >
          Ver
        </button>
      </td>
      <td>{order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
      <td>
        {order.status === "En curso" ? (
          <button className="btn btn-danger" onClick={() => handleCancelOrder(order.code)}>
            Cancelar
          </button>
        ): null}        
      </td>
    </tr>
  );
};
