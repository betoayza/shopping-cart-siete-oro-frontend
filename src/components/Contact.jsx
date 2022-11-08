import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { NavBarUser } from "./NavBarUser";

const initialForm = {
  name: "",
  lastName: "",
  mail: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  let navigate = useNavigate();
  const { username, code } = useParams();
  console.log(username, code);

  const handleClean = () => {
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Mensaje enviado!");
    handleClean();
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      {username !== "0" && code !== "0" && (
        <NavBarUser code={code} username={username} />
      )}
      <h2>Contacto:</h2>
      <form onSubmit={handleSubmit} className={"container"}>
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
          type="text"
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
