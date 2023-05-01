import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { helpAxios } from "../../../helpers/helpAxios";

const initialForm = {
  code: Date.now(),
  name: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  address: "",
  neighborhood: "",
  phone: "",
  zip: "",
  type: "Estandar",
  status: "Activo",
};

const SignUp = () => {
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addedUser = await helpAxios().signup(form);

    if (addedUser instanceof Error) {
      setModal(true);
      setIsError(true);
    } else {
      if (addedUser.type === "Admin") setNewUser("Admin");
      else if (addedUser.type === "Estandar") setNewUser(addedUser.username);

      setModal(true);
    }

    handleClean();
  };

  const handleClean = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setModal(false);
    setIsError(false);
  };

  return modal ? (
    <Modal>
      <div>
        {isError ? (
          <h2 style={{ color: "#ff4500" }}>
            Error: nombre de usuario y/o email ya registrado :(
          </h2>
        ) : (
          <h2>
            Registro exitoso! Bienvenido/a{" "}
            <span style={{ color: "#f5f5f5" }}>@{newUser}!</span> ;)
          </h2>
        )}
        <button className={"btn btn-danger"} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  ) : (
    <div
      className={"h-100 w-100 text-center border"}
      style={{ display: "grid", placeItems: "center" }}
    >
      <div className="form-group">
        <h1>Regístrese</h1>
        <form onSubmit={handleSubmit} className={"container"}>
          <input
            type="hidden"
            className="form-control w-100"
            name="code"
            value={form.code}
          />

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
            name="email"
            placeholder="Email..."
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control w-100"
            name="username"
            placeholder="Nombre usuario..."
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control w-100"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control w-100"
            name="address"
            placeholder="Direccion..."
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control w-100"
            name="neighborhood"
            placeholder="Barrio..."
            value={form.neighborhood}
            onChange={handleChange}
            required
          />

          <input
            type="phone"
            className="form-control w-100"
            name="phone"
            placeholder="Tel..."
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control w-100"
            name="zip"
            placeholder="CP..."
            value={form.zip}
            onChange={handleChange}
            required
          />

          <input
            type="hidden"
            className="form-control"
            name="type"
            value={form.type}
          />

          <input
            type="hidden"
            className="form-control"
            name="status"
            value={form.status}
          />

          <div className="m-1">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
