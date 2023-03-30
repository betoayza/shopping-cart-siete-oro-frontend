import React, { useEffect, useState } from "react";
import { helpFetchs } from "../../helpers/helpFetchs";
import { Loader } from "../pure/Loader";

export const ActivateUser = ({ code, setModal, setModalActivate }) => {
  const [activated, setActivated] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClose = () => {
    setModal(false);
    setModalActivate(false);
  };

  useEffect(() => {
    const result = helpFetchs().activateUser(code);

    if (result) {
      setActivated(true);
      setLoader(false);
    }
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
