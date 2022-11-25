import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const OrderTableRow = ({
  order,
  handleSearchUser,
  handleSeeOrderProducts,
  handleChangeStateOrder,
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
          <i
            className="bi-eye-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </td>
      <td>
        <button
          type="button"
          className={"btn btn-primary"}
          onClick={() => handleSeeOrderProducts(order.products)}
        >
          <i
            className="bi-eye-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </td>
      <td>${order.amount}</td>
      <td>{order.date}</td>
      <td>
        {order.status === "En curso" ? (
          // <button
          //   className={"btn btn-danger"}
          //   onClick={() => handleCancelOrder(order.code)}
          // >
          //   Cancelar
          // </button>

          <select
            className="form-select w-auto dark"
            aria-label="Default select example"
            onChange={(e) => {
              order.status === "En curso" &&
                handleChangeStateOrder(order.code, e.target.value);
            }}
          >
            <option value="En curso">En curso</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Entregado">Entregado</option>
          </select>
        ) : (
          order.status
        )}
      </td>
    </tr>
  );
};
