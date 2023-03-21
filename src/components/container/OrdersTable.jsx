import axios from "axios";
import React, { useState } from "react";
import { Modal } from "../pure/Modal";
import { NavBarAdmin } from "../pure/NavBarAdmin";
import { OrderTableRow } from "../pure/OrderTableRow";
import { ProductsTable } from "./ProductsTable";
import { SearchingBarOrders } from "./SearchingBarOrders";
import { SearchUser } from "./SearchUser";
import { Loader } from "../pure/Loader";

export const OrdersTable = ({
  orders,
  setOrders,
  showSearchingBar = true,
  isModalStyle = false,
}) => {
  const [modal, setModal] = useState(false);
  const [modalSearchOrder, setModalSearchOrder] = useState(false);
  const [modalSeeProducts, setModalSeeProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalSearchUser, setModalSearchUser] = useState(null);
  const [userCode, setUserCode] = useState(null);
  const [term, setTerm] = useState("");
  const [loader, setLoader] = useState(true);
  const [modalChangeOrderState, setChangeOrderState] = useState(false);

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
      url: `${import.meta.env.VITE_API}/products/get/list`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      params: { itemsIDs },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setProducts(res.data);
          setLoader(false);
        }
      })
      .catch((error) => error);
  };

  const handleCloseProducts = () => {
    setModal(false);
    setModalSeeProducts(false);
    setProducts([]);
  };

  const handleChangeStateOrder = async (orderCode, newState) => {
    console.log(orderCode, newState);
    const code = orderCode;

    const options = {
      method: "put",
      url: `${import.meta.env.VITE_API}/admin/orders/change-state`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      data: { code, newState },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => error);
  };

  return modal ? (
    <Modal>
      {modalSeeProducts &&
        (loader ? (
          <Loader />
        ) : (
          <div className={""} style={{ color: "green", maxHeight: "100vh" }}>
            <ProductsTable
              products={products}
              setProducts={setProducts}
              addAndSearch={false}
              seeActions={false}
              isModalStyle={true}
            />
            <button className={"btn btn-danger"} onClick={handleCloseProducts}>
              Cerrar
            </button>
          </div>
        ))}
      {modalSearchUser && (
        <div
          className={"w-100"}
          style={{ display: "grid", placeItems: "center", maxHeight: "100vh" }}
        >
          <SearchUser
            code={userCode}
            setModal={setModal}
            setModalSearchUser={setModalSearchUser}
          />
        </div>
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
    <div className={"d-grid align-content-center vw-100 h-auto"}>
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

      <div className={"d-flex justify-content-center vw-100 h-100"}>
        {orders.length ? (
          <div className={"w-100 h-auto"}>
            {orders.length === 1 ? <h2>Pedido:</h2> : <h2>Pedidos:</h2>}
            <div className={"w-100 d-flex justify-content-center"}>
              <div
                className={"table-responsive overflow-auto"}
                style={{ width: "75%", maxHeight: "500px" }}
              >
                <table
                  className={"table table-hover table-sm"}
                  style={isModalStyle ? { color: "#20c997" } : null}
                >
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
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
                            handleChangeStateOrder={handleChangeStateOrder}
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
