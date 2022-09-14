import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const SuccessPayment = () => {
  let navigate = useNavigate(null);
  let { userCode } = useParams();

  const handleRedirect = () => {
    const url = `/user/shopping-cart/${userCode}`;
    navigate(url);
  };

  useEffect(() => {
    const removeAllItems = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { userCode },
      };
      await axios
        .delete("/api/user/shopping-cart/delete/all", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setShoppingCart(null);
          }
        })
        .catch((error) => error);
    };
    removeAllItems();
  }, []);

  return (
    <div>
      <h2>Gracias por su compra ;)</h2>
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
