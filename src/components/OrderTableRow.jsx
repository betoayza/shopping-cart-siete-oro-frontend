import React from "react";

export const OrderTableRow = ({ order, handleSearchUser }) => {
  return (
    <tr>
      <td>{order.code}</td>
      <td>
        {order.userCode}{" "}
        <button className="btn btn-dark" onClick={() => handleSearchUser}>
          Ver
        </button>
      </td>
      <td>{order.products}</td>
      <td>{order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
    </tr>
  );
};
