import React from "react";
import { useNavigate } from "react-router-dom";

export const PendingPayment = () => {
  let navigate = useNavigate(null);

  const handleRedirect = () => {
    const url = "/user/shopping-cart/:userCode";
    navigate(url);
  };

  return (
    <div>
      <h2>Su compra está pendiente...</h2>
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