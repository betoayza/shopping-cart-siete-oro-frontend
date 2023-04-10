import React, { useState, useEffect } from "react";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

const DeleteUser = ({ code, setModal, setModalDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const deleteUser = async () => {
      const result = await helpAxios().deleteUser(code);

      if (result instanceof Error) setIsError(true);
      else setIsDeleted(result);

      setIsLoading(false);
    };
    deleteUser();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDelete(false);
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2 className="text-center">Error en la conexión :(</h2>
  ) : (
    isDeleted && (
      <div>
        <h3 className="text-center">Baja exitosa ;)</h3>
        <button className="btn btn-danger" type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    )
  );
};

export default DeleteUser;
