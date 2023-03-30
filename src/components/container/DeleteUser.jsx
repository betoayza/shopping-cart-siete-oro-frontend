import React, { useState, useEffect } from "react";
import { helpFetchs } from "../../helpers/helpFetchs";
import { Loader } from "../pure/Loader";

const DeleteUser = ({ code, setModal, setModalDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const result = helpFetchs().deleteUser(code);
    if(result){
      setIsDeleted(result);
      setLoader(false)
    }
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDelete(false);
  };

  return loader ? (
    <Loader />
  ) : isDeleted ? (
    <>
      <h3>Baja exitosa ;)</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Close
      </button>
    </>
  ) : (
    <>
      <h3>Ya estaba dado de baja</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Close
      </button>
    </>
  );
};

export default DeleteUser;
