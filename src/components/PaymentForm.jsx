import React, { useEffect, useState } from "react";
import { mp } from "../mp/mp";
import "../css/styles_payment_form.css";

// const wind = window.open();

const cardForm = mp.cardForm({
  amount: "100.5",
  iframe: true,
  form: {
    id: "form-checkout",
    cardNumber: {
      id: "form-checkout__cardNumber",
      placeholder: "Card Number",
    },
    expirationDate: {
      id: "form-checkout__expirationDate",
      placeholder: "MM/YY",
    },
    securityCode: {
      id: "form-checkout__securityCode",
      placeholder: "Security Code",
    },
    cardholderName: {
      id: "form-checkout__cardholderName",
      placeholder: "Cardholder",
    },
    issuer: {
      id: "form-checkout__issuer",
      placeholder: "Issuing bank",
    },
    installments: {
      id: "form-checkout__installments",
      placeholder: "Installments",
    },
    identificationType: {
      id: "form-checkout__identificationType",
      placeholder: "Document type",
    },
    identificationNumber: {
      id: "form-checkout__identificationNumber",
      placeholder: "Document number",
    },
    cardholderEmail: {
      id: "form-checkout__cardholderEmail",
      placeholder: "Email",
    },
  },
  callbacks: {
    onFormMounted: (error) => {
      if (error) return console.warn("Form Mounted handling error: ", error);
      console.log("Form mounted");
    },
    onSubmit: (event) => {
      event.preventDefault();

      const {
        paymentMethodId: payment_method_id,
        issuerId: issuer_id,
        cardholderEmail: email,
        amount,
        token,
        installments,
        identificationNumber,
        identificationType,
      } = cardForm.getCardFormData();

      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token,
          issuer_id,
          payment_method_id,
          transaction_amount: Number(amount),
          installments: Number(installments),
          description: "Product Description",
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
        }),
      });
    },
    onFetching: (resource) => {
      console.log("Fetching resource: ", resource);

      // Animate progress bar
      const progressBar = document.querySelector(".progress-bar");
      progressBar.removeAttribute("value");

      return () => {
        progressBar.setAttribute("value", "0");
      };
    },
  },
});

export const PaymentForm = ({ setModal, setModalPaymentForm }) => {
  const [error, setError] = useState(false);

  const handleClose = () => {
    setModal(false);
    setModalPaymentForm(false);
  };

  // useEffect(() => {
  //   wind.postMessage(cardForm, "https://www.mercadolibre.com");
  //   wind.addEventListener(
  //     cardForm,
  //     (event) => {
  //       if (event.origin !== "https://www.mercadolibre.com") setError(true);

  //       // …
  //     },
  //     false
  //   );
  // }, []);

  return (
    //   <>
    //     <h3>An error happened :(</h3>
    //   </>
    // ) : (
    // <iframe src={cardForm} frameBorder="0">

    <div className={"form-control general-div"}>
      <form id={"form-checkout"}>
        <div id={"form-checkout__cardNumber"} className={"container"}></div>
        <div id={"form-checkout__expirationDate"} className={"container"}></div>
        <div id={"form-checkout__securityCode"} className={"container"}></div>
        <input
          type={"text"}
          id={"form-checkout__cardholderName"}
          className={"form-control"}
        />
        <select className={"form-select"} id="form-checkout__issuer"></select>
        <select
          className={"form-select"}
          id={"form-checkout__installments"}
        ></select>
        <select
          className={"form-select"}
          id={"form-checkout__identificationType"}
        ></select>
        <input
          type={"text"}
          id={"form-checkout__identificationNumber"}
          className={"form-control"}
        />
        <input
          type={"email"}
          id={"form-checkout__cardholderEmail"}
          className={"form-control"}
        />

        <button
          type={"submit"}
          id={"form-checkout__submit"}
          className={"btn btn-primary w-25"}
        >
          Pagar
        </button>
        <progress value={"0"} className={"progress-bar"}>
          Loading...
        </progress>
      </form>
      <button className={"btn btn-danger"} onClick={handleClose}>
        Cancelar
      </button>
    </div>
    // </iframe>
  );
};
