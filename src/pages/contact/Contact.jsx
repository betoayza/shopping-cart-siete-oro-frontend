import React, { useState } from "react";
import { NavBarUser } from "../../components/container/NavBarUser";
import { Modal } from "../../components/pure/Modal";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../../components/pure/Loader";
import { useNavigate, useParams } from "react-router-dom";

const initialForm = {
  name: "",
  lastName: "",
  mail: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { username, code } = useParams();
  const navigate = useNavigate();

  console.log(username, code);

  const handleClean = () => {
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await helpAxios().contactSupport(form);

    if (result instanceof Error) setIsError(true);
    else setModal(true);

    setIsLoading(false);
    handleClean();
  };

  const handleClose = () => {
    setModal(false);
  };

  return modal ? (
    <Modal>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h2>Error en la conexión :(</h2>
      ) : (
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
          {username === "0" && code === "0" && (
            <button
              type="submit"
              className="btn btn-dark"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
