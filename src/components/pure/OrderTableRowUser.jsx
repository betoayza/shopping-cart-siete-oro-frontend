import React from "react";

export const OrderTableRowUser = ({
  order,
  handleCancelOrder,
  handleGetOrderItems,
}) => {  

  return (
    <tr>
      <td>{order.code}</td>
      <td>
        <button
          className="btn btn-dark"
          onClick={(e) => handleGetOrderItems(order.products)}
        >
          <i
            className="bi-eye-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </td>
      <td>${order.amount}</td>
      <td>{order.date}</td>
      <td>{order.status}</td>
      <td>
        {order.status === "En curso" ? (
          <button
            className="btn btn-danger"
            onClick={() => handleCancelOrder(order.code, order.products)}
          >
            Cancelar
          </button>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};
