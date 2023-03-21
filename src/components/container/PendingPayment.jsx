import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { NavBarUser } from "./NavBarUser";

export const PendingPayment = () => {
  const [user, setUser] = useState({});

  let location = useLocation();
  let { userCode } = useParams();

  console.log(location, " | ", userCode);

  //const search = useLocation().search;
  // const payment_id = new URLSearchParams(search).get("payment_id");

  // console.log(payment_id);

  // useEffect(() => {
  //   const getPayment = async () => {
  //     const options = {
  //       url: `https://api.mercadopago.com/v1/payments/${payment_id}`,

  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  //       },
  //       timeout: 3000,
  //     };

  //     await axios
  //       .request(options)
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.data) {
  //           console.log("El pago es: ", res.data);
  //           setInstallments(res.data.installments);
  //           setTotalAmount(res.data.transaction_details.total_paid_amount);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   getPayment();
  // }, []);

  useEffect(() => {
    //get user data
    const getUserData = async () => {
      const options = {
        url: `${import.meta.env.VITE_API}/user/get`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        params: { userCode },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log("Usuario: ", res.data);
          if (res.data) {
            setUser(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getUserData();
  }, []);

  return (
    <div className={""}>
      <NavBarUser code={userCode} username={user.username} />
      <h1>Mi carrito</h1>

      <div className={"w-100 d-flex justify-content-center"}>
        <div
          className={"d-grid align-items-center"}
          style={{ width: "400px", height: "630px" }}
        >
          <h2 style={{ color: "orange" }}>Pago pendiente...</h2>
        </div>
      </div>
    </div>
  );
};
