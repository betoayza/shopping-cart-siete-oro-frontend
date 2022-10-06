import React from "react";

export const OrderTableRowUser = ({
  order,
  handleSeeItems,
  handleDelete,
  handleActivate,
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
        {order.status === "En curso" && (
          <button className="btn btn-danger" onClick={() => handleDelete()}>
            Cancelar
          </button>
        )}
        {order.status === "Entregado" && null}

        {order.status === "Cancelado" && (
          <button className="btn btn-danger" onClick={() => handleActivate()}>
            Activar
          </button>
        )}
      </td>
    </tr>
  );
};
