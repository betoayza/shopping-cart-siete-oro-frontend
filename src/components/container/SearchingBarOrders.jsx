import React, { useEffect, useState } from "react";
import { OrdersTable } from "./OrdersTable";
import { helpAxios } from "../../helpers/helpAxios";

export const SearchingBarOrders = ({
  term,
  setTerm,
  setModal,
  setModalSearchOrder,
}) => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const result = await helpAxios().getOrders(term);

      if (result instanceof Error) setIsError(true);
      else {
        console.log(result);
        setOrders(result);
        setModal(true);
        setModalSearchOrder(true);
      }
    };

    if (term != "") getOrders();
    else {
      setModal(false);
      setModalSearchOrder(false);
      setOrders([]);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setModal(false);
    setModalSearchOrder(false);
    setOrders([]);
    setTerm("");
  };

  return isError ? (
    <h3 className="text-center">Error en la conexión :(</h3>
  ) : (
    <div className={"searching-bar"}>
      <div className={"w-50"}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          className={"form-control w-100"}
          placeholder={"Buscar..."}
        />
      </div>

      {orders.length
        ? term !== "" && (
            <div className="text-center">
              <OrdersTable
                orders={orders}
                setOrders={setOrders}
                showSearchingBar={false}
                isModalStyle={true}
                isLoadingActivated={false}
              />
              <button className={"btn btn-danger w-10"} onClick={handleClose}>
                Cerrar
              </button>
            </div>
          )
        : null}
    </div>
  );
};
