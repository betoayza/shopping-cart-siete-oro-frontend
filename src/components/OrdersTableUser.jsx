import React, { useState, useEffect } from "react";
import { OrderTableRowUser } from "./OrderTableRowUser";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";
import axios from "axios";

export const OrdersTableUser = ({ orders, setOrders, userCode }) => {
  const [isModalSeeItems, setIsModalSeeItems] = useState(false);
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState(null);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);
  const [orderCode, setOrderCode] = useState(null);
  const [isOrderReActivated, setIsOrderReActivated] = useState(false);

  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  useEffect(() => {
    const getAllProducts = async () => {
      let ord = { ...orders };
      console.log(ord);
      let itemsIDs = ord[0].products;
      console.log(itemsIDs);

      const options = {
        url: "/api/products/get/list",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { itemsIDs },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
          }
        })
        .catch((error) => error);
    };
    if (isModalSeeItems) getAllProducts();
  }, [isModalSeeItems]);

  // useEffect(() => {
  //   const cancelOrder = async () => {
  //     let code = orderCode;
  //     console.log(userCode, "|", code);
  //     const options = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Accept: "application/json",
  //         timeout: 3000,
  //       },
  //       data: { code, userCode },
  //     };

  //     await axios
  //       .delete("/api/user/orders/delete", options)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data) {
  //           setOrders(res.data);
  //         }
  //       })
  //       .catch((error) => error);
  //   };
  //   if (isOrderCanceled && orderCode) cancelOrder();
  // }, [isOrderCanceled, userCode]);

  const handleSeeItems = (orderProducts) => {
    setModal(true);
    setIsModalSeeItems(true);
  };

  const handleCancelOrder = async (orderCode) => {
    // setIsOrderCanceled(true);
    // setOrderCode(orderCode);

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
      data: { code, userCode },
    };

    await axios
      .delete("/api/user/orders/delete", options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setOrders(res.data);
        }
      })
      .catch((error) => error);
  };

  const handleActivateOrder = (orderCode) => {
    setIsOrderReActivated(true);
    setOrderCode(orderCode);
  };

  const handleClose = () => {
    setModal(false);
    setIsModalSeeItems(false);
    setProducts(null);
  };

  return modal ? (
    <Modal>
      {isModalSeeItems && products && (
        <div>
          <ProductsTableUsers
            products={products}
            setProducts={setProducts}
            userCode={userCode}
          />
          <button className="btn btn-danger" onClick={() => handleClose()}>
            Cerrar
          </button>
        </div>
      )}
    </Modal>
  ) : (
    <div className={"vh-100"}>
      <h2>Mis pedidos:</h2>
      <div className={"w-100 d-flex justify-content-center"}>
        <div className={"w-75 table-responsive"}>
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
              {orders ? (
                orders.map((order, index) => {
                  return (
                    <OrderTableRowUser
                      key={index}
                      order={order}
                      handleSeeItems={handleSeeItems}
                      handleCancelOrder={handleCancelOrder}
                      handleActivateOrder={handleActivateOrder}
                    />
                  );
                })
              ) : (
                <h3>No hay pedidos aun :(</h3>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
