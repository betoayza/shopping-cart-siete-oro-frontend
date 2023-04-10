import React, { useEffect, useState } from "react";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

export const ActivateUser = ({ code, setModal, setModalActivate }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setModal(false);
    setModalActivate(false);
  };

  useEffect(() => {
    const activateUser = async () => {
      const result = await helpAxios().activateUser(code);

      if (result instanceof Error) setIsError(true);
      else setIsActivated(true);

      setIsLoading(false);
    };
    activateUser();
  }, []);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2 className="text-center">Error en la conexión :(</h2>
  ) : (
    isActivated && (
      <div>
        <h3 className="text-center">Activado :)</h3>
        <button className={"btn btn-danger"} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    )
  );
};
