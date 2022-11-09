import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";
import { Modal } from "./Modal";

const initialForm = {
  name: "",
  lastName: "",
  mail: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [isSended, setIsSended] = useState(false);

  let navigate = useNavigate();
  const { username, code } = useParams();
  console.log(username, code);

  const handleClean = () => {
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSended(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClose = () => {
    setIsSended(false);
    handleClean();
  };

  return isSended ? (
    <Modal>
      <h2>Mensaje enviado ;)</h2>
      <button type="button" className="btn btn-danger" onClick={handleClose}>
        Cerrar
      </button>
    </Modal>
  ) : (
    <div className={"vh-100"}>
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
          required
        />

        <input
          type="text"
          className="form-control w-100"
          name="lastName"
          placeholder="Apellido..."
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          className="form-control w-100"
          name="mail"
          placeholder="Email..."
          value={form.mail}
          onChange={handleChange}
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
