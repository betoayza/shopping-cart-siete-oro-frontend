import React, { useState, useEffect } from "react";
import { OrderTableRowUser } from "./OrderTableRowUser";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { OrderItemsTableUser } from "./OrderItemsTableUser";
import axios from "axios";

export const OrdersTableUser = ({ orders, setOrders, userCode, username }) => {
  const [isModalSeeItems, setIsModalSeeItems] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState(null);

  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  const handleGetItemsList = async (orderItems) => {
    // console.log(orderItems);

    const options = {
      url: "/api/user/orders/items/list",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      params: { orderItems },
      timeout: 3000,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setModal(true);
          setIsModalSeeItems(true);
          setItems(res.data);
        }
      })
      .catch((error) => error);
  };

  // const handleActivateOrder = (orderCode) => {
  //   setIsOrderReActivated(true);
  //   setOrderCode(orderCode);
  // };

  const handleClose = () => {
    setModal(false);
    setIsModalSeeItems(false);
    setItems(null);
  };

  const handleCancelOrder = async (orderCode, orderItemsData) => {
    let code = orderCode;
    console.log(userCode, "|", code);

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { code, userCode, orderItemsData },
    };

    await axios
      .delete("/api/user/orders/delete", options)
      .then((res) => {
        console.log(res.data);
        alert("Orden cancelada");
      })
      .catch((error) => error);
  };

  return modal ? (
    <Modal>
      {isModalSeeItems && items && (
        <div>
          <OrderItemsTableUser
            products={items}
            userCode={userCode}
            showButton={false}            
            username={username}
          />
          <button className="btn btn-danger" onClick={() => handleClose()}>
            Cerrar
          </button>
        </div>
      )}
    </Modal>
  ) : (
    <div className={"vh-100"}>
      <div className={"w-100 d-flex justify-content-center"}>
        <div
          className={"table-responsive overflow-auto"}
          style={{ width: "75%", maxHeight: "500px" }}
        >
          <table className={"table table-hover"}>
            <thead className={"table-success"}>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Items</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <OrderTableRowUser
                    key={index}
                    order={order}
                    handleCancelOrder={handleCancelOrder}
                    handleGetItemsList={handleGetItemsList}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
