import React from "react";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  let navigate = useNavigate();

  return (
    <>
      <h1>Error 404: resource not founded</h1>
      <button className={"btn btn-dark"} onClick={() => navigate(-1)}>
        Volver
      </button>
    </>
  );
};
