import axios from "axios";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { NavBarAdmin } from "./NavBarAdmin";
import { OrderTableRow } from "./OrderTableRow";
import { ProductsTable } from "./ProductsTable";
import { SearchingBarOrders } from "./SearchingBarOrders";
import { SearchUser } from "./SearchUser";

export const OrdersTable = ({ orders, setOrders, showSearchingBar = true }) => {
  const [orderCode, setOrderCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalSearchOrder, setModalSearchOrder] = useState(false);
  const [modalSeeProducts, setModalSeeProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalSearchUser, setModalSearchUser] = useState(null);
  const [userCode, setUserCode] = useState(null);

  if (!Array.isArray(orders)) {
    orders = [orders];
  }

  const handleSearchUser = (userCode) => {
    setModal(true);
    setModalSearchUser(true);
    setUserCode(userCode);
  };

  const handleSeeOrderProducts = async (orderProducts) => {
    setModal(true);
    setModalSeeProducts(true);
    console.log(orderProducts);

    let itemsIDs = orderProducts;
    console.log(itemsIDs); //works

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

  const handleClose = () => {
    setModal(false);
    setModalSeeProducts(false);
    setProducts([]);
  };

  const handleSearchOrder = () => {
    setModal(true);
    setModalSearchOrder(true);
  };

  return modal ? (
    <Modal>
      {modalSeeProducts && (
        <div className={""}>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
          />
          <button className={"btn btn-danger"} onClick={handleClose}>
            Cerrar
          </button>
        </div>
      )}
      {modalSearchUser && (
        <SearchUser
          code={userCode}
          setModal={setModal}
          setModalSearchUser={setModalSearchUser}
        />
      )}
      {modalSearchOrder && (
        <SearchingBarOrders
          setModal={setModal}
          setModalSearchOrder={setModalSearchOrder}
        />
      )}
    </Modal>
  ) : (
    <div className={"d-grid align-content-center w-100"}>
      <NavBarAdmin />
      <div className={"vh-100 w-100 border d-flex justify-content-center"}>
        <div className={"border vh-100 w-75"}>
          {showSearchingBar && (
            <div>
              <button
                className={"btn btn-success w-10"}
                onClick={handleSearchOrder}
              >
                Buscar
              </button>
            </div>
          )}
          {orders.length === 1 ? <h3>Pedido:</h3> : <h3>Pedidos:</h3>}

          <div className={"d-flex justify-content-center"}>
            <div className={"table-responsive"}>
              <table className={"table table-light table-hover"}>
                <thead>
                  <tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => {
                      return (
                        <OrderTableRow
                          key={order._id}
                          order={order}
                          handleSearchUser={handleSearchUser}
                          handleSeeOrderProducts={handleSeeOrderProducts}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
