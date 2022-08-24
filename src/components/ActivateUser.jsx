import axios from "axios";
import React, { useEffect, useState } from "react";

export const ActivateUser = ({
  code,
  setModal,
  setModalActivate
}) => {
  const [activated, setActivated] = useState(false);

  const handleClose = () => {
    setModal(false);
    setModalActivate(false);
  };

  useEffect(() => {
    const activateProduct = async () => {
      const options = {
        url: "/api/admin/users/activate",
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
          if (res.data) setActivated(true);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    activateProduct();
  }, []);

  return activated ? (
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
