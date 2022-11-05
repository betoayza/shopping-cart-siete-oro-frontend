import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { Loader } from "./Loader";

export const ActivateProduct = ({
  code,
  setModal,
  setModalActivateProduct,
}) => {
  const [activated, setActivated] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClose = () => {
    setModal(false);
    setModalActivateProduct(false);
  };

  useEffect(() => {
    const activateProduct = async () => {
      const options = {
        url: `${API}/admin/products/activate`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { code },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setActivated(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    activateProduct();
  }, []);

  return loader ? (
    <Loader />
  ) : activated ? (
    <>
      <h3>Activado :)</h3>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cerrar
      </button>
    </>
  ) : (
    <>
      <h3>No hace falta activar</h3>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cerrar
      </button>
    </>
  );
};
