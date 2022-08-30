import React, { useState } from "react";
import { Modal } from "./Modal";
import { OrderTableRow } from "./OrderTableRow";
import { ProductsTable } from "./ProductsTable";
import { SearchUser } from "./SearchUser";
import { SelectOrdersCodes } from "./SelectOrdersCodes";

export const OrdersTable = ({ orders, setOrders }) => {
  const [orderCode, setOrderCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalSearchOrder, setModalSearchOrder] = useState(false);
  const [modalSeeProducts, setModalSeeProducts] = useState(false);
  const [products, setProducts] = useState(null);
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

  const handleSeeProducts = (products) => {
    setModal(true);
    setModalSeeProducts(true);
    setProducts(products);
  };

  const handleClose = () => {
    setModal(false);
    setModalSeeProducts(false);
    setProducts(null);
  };

  return modal ? (
    <Modal>
      {modalSeeProducts && (
        <>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
          />
          <button className="btn btn-dark" onClick={handleClose}>
            Cerrar
          </button>
        </>
      )}
      {modalSearchUser && (
        <SearchUser
          code={userCode}
          setModal={setModal}
          setModalSearchUser={setModalSearchUser}
        />
      )}
    </Modal>
  ) : (
    <>
      <SelectOrdersCodes
        setOrderCode={setOrderCode}
        setModal={setModal}
        setModalSearchOrder={setModalSearchOrder}
      />
      {orders.length === 1 ? <h3>Pedido:</h3> : <h3>Pedidos:</h3>}

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
                    handleSeeProducts={handleSeeProducts}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
