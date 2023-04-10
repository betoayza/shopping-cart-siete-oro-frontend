import React, { useEffect, useState } from "react";
import { Loader } from "../pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const ActivateProduct = ({
  code,
  setModal,
  setModalActivateProduct,
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setModal(false);
    setModalActivateProduct(false);
  };

  useEffect(() => {
    const activateProduct = async () => {
      const result = await helpAxios().activateProduct(code);

      if (result instanceof Error) setIsError(true);
      else {
        setIsActivated(true);
        setLoader(false);
      }
    };
    activateProduct();
  }, []);

  return loader ? (
    <Loader />
  ) : isError ? (
    <h2>Error en la conexión :(</h2>
  ) : isActivated ? (
    <div>
      <h3>Activado :)</h3>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cerrar
      </button>
    </div>
  ) : (
    <div>
      <h3>No hace falta activar</h3>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cerrar
      </button>
    </div>
  );
};
