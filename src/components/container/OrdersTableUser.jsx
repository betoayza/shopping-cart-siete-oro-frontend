import React, { useState } from "react";
import { OrderTableRowUser } from "../pure/OrderTableRowUser";
import { Modal } from "../pure/Modal";
import { OrderItemsTableUser } from "./OrderItemsTableUser";
import { helpAxios } from "../../helpers/helpAxios";

export const OrdersTableUser = ({ orders, setOrders, userCode, username }) => {
  const [isModalSeeItems, setIsModalSeeItems] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState(null);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOrderItems = (orderItems) => {
    const getOrderItems = async () => {
      const itemsList = await helpAxios().getOrderItems(orderItems);

      if (itemsList instanceof Error) setIsError(true);
      else {
        setModal(true);
        setIsModalSeeItems(true);
        setItems(itemsList);
      }

      setIsLoading(false);
    };

    getOrderItems();
  };  

  const handleClose = () => {
    setModal(false);
    setIsModalSeeItems(false);
    setItems(null);
    setIsOrderCanceled(false);
  };

  const handleCancelOrder = async (orderCode, orderItemsData) => {
    
    const result = await helpAxios().cancelOrder(
      orderCode,
      userCode,
      orderItemsData
    );

    if (result instanceof Error) setIsError(true);
    else {
      setModal(true);
      setIsOrderCanceled(true);
    }

    setIsLoading(false);
  };

  return modal ? (
    <Modal>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h2>Error en la conexión :(</h2>
      ) : (
        <div>
          {isModalSeeItems && items && (
            <div
              className={"vh-100 vw-100"}
              style={{ display: "grid", placeItems: "center" }}
            >
              <div className={""}>
                <OrderItemsTableUser
                  products={items}
                  userCode={userCode}
                  showButton={false}
                  username={username}
                />

                <div className="mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClose()}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {isOrderCanceled && (
            <div className={"vh-100 vw-100 d-grid align-content-center"}>
              <div className={"text-center"}>
                <h3>Orden cancelada ;)</h3>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClose()}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  ) : (
    <div className={"h-auto"}>
      <div className={"w-100 d-flex justify-content-center"}>
        <div
          className={"table-responsive overflow-auto"}
          // style={{ width: "75%", maxHeight: "500px" }}
        >
          <table className={"table table-hover"}>
            <thead>
              <tr>
                <th scope="col">Código</th>
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
                    handleGetOrderItems={handleGetOrderItems}
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
