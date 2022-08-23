import React from "react";

export const OrderTableRowUser = ({ order, handleSeeOrder }) => {
  return (
    <tr>
      <td>{order.code}</td>
      <td>
        <button className="btn btn-dark" onClick={() => handleSeeOrder(order.products)}>
          Ver
        </button>     
      </td>
      <td>{order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
      <td>
        <button className="btn btn-danger" onClick={() => handleDelete()}>
          Cancelar
        </button>
      </td>
    </tr>
  );
};
