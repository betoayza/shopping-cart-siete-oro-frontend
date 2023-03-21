import React from "react";
import { useNavigate } from "react-router-dom";

export const FailedPayment = () => {
  let navigate = useNavigate(null);

  const handleRedirect = () => {
    const url = "/user/shopping-cart/:userCode";
    navigate(url);
  };

  return (
    <div>
      <h2>Falló su compra :(</h2>
      <button
        type="button"
        className={"btn btn-primary"}
        onClick={handleRedirect}
      >
        Volver
      </button>
    </div>
  );
};