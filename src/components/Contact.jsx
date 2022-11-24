import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";
import { Modal } from "./Modal";
import axios from "axios";

const initialForm = {
  name: "",
  lastName: "",
  mail: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [isSended, setIsSended] = useState(false);
  const [modal, setModal] = useState(false);

  let navigate = useNavigate();
  const { username, code } = useParams();
  console.log(username, code);

  const handleClean = () => {
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   

    const options = {
      url: "https://formsubmit.co/ajax/203cf7fc5cf3429a39018970bed76969",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 3000,
      data: form,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res);
        setModal(true);
        if (res.data) {
          setIsSended(true);
        }
      })
      .catch((error) => error);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClose = () => {
    setModal(false);
    setIsSended(false);
  };

  return isSended ? (
    <Modal>
      {isSended ? (
        <div>
          <h3>Mensaje enviado ;)</h3>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      ) : (
        <div
          className={"text-center"}
          style={{ display: "grid", placeItems: "center" }}
        >
          <h3>Hubo un error :(</h3>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      )}
    </Modal>
  ) : (
    <div className={"h-auto"}>
      {username !== "0" && code !== "0" && (
        <NavBarUser code={code} username={username} />
      )}
      <h2>Contacto:</h2>
      <form
        onSubmit={handleSubmit}
        className={"container"}
        style={{ fontFamily: "cursive" }}
      >
        <input
          type="text"
          className="form-control w-100"
          name="name"
          placeholder="Nombre..."
          value={form.name}
          onChange={handleChange}
          style={{ color: "#6610f2", fontStyle: "italic" }}
          required
        />

        <input
          type="text"
          className="form-control w-100"
          name="lastName"
          placeholder="Apellido..."
          value={form.lastName}
          onChange={handleChange}
          style={{ color: "#6610f2", fontStyle: "italic" }}
          required
        />

        <input
          type="email"
          className="form-control w-100"
          name="mail"
          placeholder="Email..."
          value={form.mail}
          onChange={handleChange}
          style={{ color: "#6610f2", fontStyle: "italic" }}
          required
        />

        <textarea
          type="text"
          className="form-control w-100"
          name="message"
          placeholder="Mensaje..."
          value={form.message}
          onChange={handleChange}
          rows={5}
          cols={10}
          maxLength={500}
          style={{ color: "#6610f2", fontStyle: "italic" }}
          required
        />

        <div className={"d-flex m-1"}>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>

          <button type="reset" className="btn btn-danger" onClick={handleClean}>
            Limpiar
          </button>

          {username === "0" && code === "0" && (
            <button type="button" className="btn btn-dark" onClick={handleBack}>
              Volver
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
