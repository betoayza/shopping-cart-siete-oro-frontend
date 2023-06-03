import React, { useState, useEffect } from "react";
import { Loader } from "../pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const DeleteProduct = ({ code, setModal, setModalDeleteProduct }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        const result = await helpAxios().deleteProduct(code);

        // if (result instanceof Error) setIsError(true);
        
        setIsDeleted(true);
        setIsLoading(false);        
      } catch(error){
         console.error("La respuesta fue error: ", error);
         setIsError(true)
      }
    };
    deleteProduct();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDeleteProduct(false);
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2>Error de conexión :(</h2>
  ) : (
    isDeleted && (
      <div>
        <h3>Baja exitosa ;)</h3>
        <button className="btn btn-danger" type="button" onClick={handleClose}>
          Cerrar
        </button>
      </div>
    )
  );
};

export default DeleteProduct;
