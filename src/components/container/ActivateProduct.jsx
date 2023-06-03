import React, { useEffect, useState } from "react";
import { Loader } from "../pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const ActivateProduct = ({
  code,
  setModal,
  setModalActivateProduct,
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setModal(false);
    setModalActivateProduct(false);
  };

  useEffect(() => {
    const activateProduct = async () => {
      try{
        const result = await helpAxios().activateProduct(code);
  
        /// if (result instanceof Error) setIsError(true);
        
        setIsActivated(true);
        setIsLoading(false);
      }catch(error){
        console.error("La respuesta fue error: ", error)
        setIsError(true)
      }      
    };
    activateProduct();
  }, []);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2>Error en la conexión :(</h2>
  ) : (
    isActivated && (
      <div>
        <h3>Activado :)</h3>
        <button className={"btn btn-danger"} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    )
  );
};
