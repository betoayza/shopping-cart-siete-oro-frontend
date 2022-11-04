import axios from "axios";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { NavBarAdmin } from "./NavBarAdmin";
import { OrderTableRow } from "./OrderTableRow";
import { ProductsTable } from "./ProductsTable";
import { SearchingBarOrders } from "./SearchingBarOrders";
import { SearchUser } from "./SearchUser";
import { API } from "../api/api";

export const OrdersTable = ({ orders, setOrders, showSearchingBar = true }) => {
  const [modal, setModal] = useState(false);
  const [modalSearchOrder, setModalSearchOrder] = useState(false);
  const [modalSeeProducts, setModalSeeProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalSearchUser, setModalSearchUser] = useState(null);
  const [userCode, setUserCode] = useState(null);
  const [term, setTerm] = useState("");

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

    let itemsIDs = orderProducts.map((product) => {
      return product.id;
    });
    console.log(itemsIDs); //works

    const options = {
      url: `${API}/products/get/list`,
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

  const handleCloseProducts = () => {
    setModal(false);
    setModalSeeProducts(false);
    setProducts([]);
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
          <button className={"btn btn-danger"} onClick={handleCloseProducts}>
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
          term={term}
          setTerm={setTerm}
          setModal={setModal}
          setModalSearchOrder={setModalSearchOrder}
        />
      )}
    </Modal>
  ) : (
    <div className={"d-grid align-content-center vw-100"}>
      {showSearchingBar && (
        <div>
          <NavBarAdmin />
          <SearchingBarOrders
            term={term}
            setTerm={setTerm}
            setModal={setModal}
            setModalSearchOrder={setModalSearchOrder}
          />
        </div>
      )}

      <div className={"d-flex justify-content-center vw-100"}>
        {orders.length ? (
          <div className={"w-100"}>
            {orders.length === 1 ? <h3>Pedido:</h3> : <h3>Pedidos:</h3>}
            <div className={"d-flex justify-content-center"}>
              <div
                className={"table-responsive overflow-auto"}
                style={{ width: "75%", maxHeight: "500px" }}
              >
                <table className={"table table-hover table-light table-sm"}>
                  <thead className={"table-success"}>
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
        ) : (
          <h2>Sin resultados :(</h2>
        )}
      </div>
    </div>
  );
};
