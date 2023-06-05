import React, { useEffect, useState, useCallback } from "react";
import { OrdersTable } from "./OrdersTable";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

export const SearchingBarOrders = ({
  term,
  setTerm,
  setModal,
  setModalSearchOrder,
}) => {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);

  const getOrders = useCallback(async () => {
    if (term != "") {
      const result = await helpAxios().getOrders(term);

      setOrders(result);
      setModal(true);
      setModalSearchOrder(true);
    } else {
      setModal(false);
      setModalSearchOrder(false);
      setOrders([]);
    }
  }, [term]);

  useEffect(() => getOrders, [getOrders]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setModal(false);
    setModalSearchOrder(false);
    setOrders([]);
    setTerm("");
  };

  return isError ? (
    <Loader />
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
        ? term != "" && (
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
