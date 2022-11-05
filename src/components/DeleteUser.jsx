import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../api/api";
import { Loader } from "./Loader";

const DeleteUser = ({ code, setModal, setModalDelete }) => {
  const [deleted, setDeleted] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const deleteUser = async () => {
      const options = {
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
        .delete(`${API}/admin/users/delete`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setDeleted(true);
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    deleteUser();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDelete(false);
  };

  return loader ? (
    <Loader />
  ) : deleted ? (
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
