import React from "react";

export const OrderTableRow = ({
  order,
  handleSearchUser,
  handleSeeProducts,
}) => {
  return (
    <tr>
      <td>{order.code}</td>
      <td>
        {order.userCode}{" "}
        <button
          className="btn btn-dark"
          onClick={() => handleSearchUser(order.userCode)}
        >
          Ver
        </button>
      </td>
      <td>
        <button
          type="button"
          className={"btn btn-primary"}
          onClick={() => handleSeeProducts(order.products)}
        >
          Ver
        </button>
      </td>
      <td>{order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
    </tr>
  );
};
