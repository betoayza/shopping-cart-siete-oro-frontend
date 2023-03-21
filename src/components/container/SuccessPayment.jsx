import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../pure/Loader";

export const SuccessPayment = () => {
  const [shoppingCart, setShoppingCart] = useState(null);
  const [orderAdded, setOrderAdded] = useState(false);
  const [itemsRemoved, setItemsRemoved] = useState(false);
  const [user, setUser] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [items, setItems] = useState(null);
  const [notificationForm, setNotificationForm] = useState(null);

  let location = useLocation();
  let { userCode } = useParams();

  let navigate = useNavigate();

  console.log(location, " | ", userCode);

  const search = useLocation().search;
  const payment_id = new URLSearchParams(search).get("payment_id");

  console.log("ID de pago: ", payment_id);

  useEffect(() => {
    const getPayment = async () => {
      const options = {
        url: `https://api.mercadopago.com/v1/payments/${payment_id}`,

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            console.log("El pago es: ", res.data);
            setInstallments(res.data.installments);
            setTotalAmount(res.data.transaction_details.total_paid_amount);
            setItems(res.data.additional_info.items);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getPayment();

    const getShoppingCart = async () => {
      const options = {
        url: `${import.meta.env.VITE_API}/user/shopping-cart`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 5000,
        params: { userCode },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setShoppingCart(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getShoppingCart();
  }, []);

  useEffect(() => {
    //--------------------
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
            setNotificationForm({
              usuario: `${res.data.username}`,
              mensaje:
                "Ha hecho una compra a través de Siete de Oro: E-commerce",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (shoppingCart && installments && totalAmount) getUserData();

    //---------------------------
    const addOrder = async () => {
      const options = {
        url: `${import.meta.env.VITE_API}/user/orders/add`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        data: { userCode, items, installments, totalAmount },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setOrderAdded(true);
          } else {
            alert("No se pudo registrar el pedido :(");
          }
        })
        .catch((error) => error);
    };
    if (shoppingCart && installments && totalAmount) addOrder();

    //------------------------
    const removeAllItems = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        data: { userCode },
      };
      await axios
        .delete(
          `${import.meta.env.VITE_API}/user/shopping-cart/delete/all`,
          options
        )
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setItemsRemoved(true);
          }
        })
        .catch((error) => error);
    };
    if (shoppingCart && installments && totalAmount) removeAllItems();
  }, [shoppingCart, installments, totalAmount]);

  useEffect(() => {
    //Send purchase notification to Admin
    const sendNotificationToAdmin = async () => {
      console.log("El formulario es: ", notificationForm);
      const options = {
        url: `https://formsubmit.co/ajax/${import.meta.env.VITE_EMAIL_CODE}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 3000,
        data: notificationForm,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => error);
    };

    notificationForm && sendNotificationToAdmin();
  }, [notificationForm]);

  shoppingCart && orderAdded && user && itemsRemoved && notificationForm ? (
    navigate(`/user/${user.username}/shopping-cart/${userCode}`)
  ) : (
    <Loader />
  );
};
