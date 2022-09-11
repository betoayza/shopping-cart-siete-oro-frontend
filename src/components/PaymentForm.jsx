import React, { useState } from "react";
import "../css/styles_payment_form.css";

const initialForm = {
  card: "",
  date: "",
  secCode: null,
  cardHolder: "",
  issuer: "",
  installments: null,
  idType: "",
  idNumber: null,
  email: "",
};

export const PaymentForm = ({ setModal, setModalPaymentForm }) => {
  const [error, setError] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleClose = () => {
    setModal(false);
    setModalPaymentForm(false);
  };

  const handleChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const options = {
      url: "/payment",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: data,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAdded(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={"form-control general-div"}>
      <form>
        <input
          type={"number"}
          placeholder={"XXXX XXXX XXXX XXXX"}
          className={"form-control"}
          value={form.card}
        />
        <input
          type={"text"}
          placeholder={"Fecha"}
          className={"form-control"}
          value={form.date}
        />
        <input
          type={"text"}
          placeholder={"CVV | CVC"}
          className={"form-control"}
          max={4}
          value={form.secCode}
        />
        <input
          type={"text"}
          placeholder={"Titular"}
          className={"form-control"}
          value={form.cardHolder}
        />
        <select
          className={"form-select"}
          placeholder={"Emisor"}
          value={form.issuer}
        ></select>
        <select
          className={"form-select"}
          placeholder={"Installments"}
          value={form.installments}
        ></select>
        <select
          className={"form-select"}
          placeholder={"Tipo identificacion"}
          value={form.idType}
        ></select>
        <input
          type={"text"}
          placeholder={"Número"}
          className={"form-control"}
          value={form.idNumber}
        />
        <input
          type={"email"}
          placeholder={"example@gmail.com"}
          className={"form-control"}
          value={form.email}
        />

        <button
          type={"submit"}
          className={"btn btn-primary w-25"}
          onClick={handleSubmit}
        >
          Pagar
        </button>
      </form>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cancelar
      </button>
    </div>
  );
};
