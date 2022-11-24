import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const OrderTableRow = ({
  order,
  handleSearchUser,
  handleSeeOrderProducts,
  handleCancelOrder,
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
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              e.target.value === "2" && handleCancelOrder(order.code)
            }
          >
            <option value="1">En curso</option>
            <option value="2">Cancelar</option>
          </select>
        ) : (
          order.status
        )}
      </td>
    </tr>
  );
};
