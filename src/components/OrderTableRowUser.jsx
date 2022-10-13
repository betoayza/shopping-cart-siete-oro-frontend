import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

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
          <i
            className="bi-eye-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </td>
      <td>{order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
      <td>
        {order.status === "En curso" ? (
          <button
            className="btn btn-danger"
            onClick={() => handleCancelOrder(order.code)}
          >
            Cancelar
          </button>
        ) : "-"}
      </td>
    </tr>
  );
};
