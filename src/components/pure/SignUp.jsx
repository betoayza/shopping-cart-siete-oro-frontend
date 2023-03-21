import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";

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
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [newUser, setNewUser] = useState(null);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: `${import.meta.env.VITE_API}/signup`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      data: form,
    };
    console.log(form);

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setModal(true);
        if (res.data) {
          if (res.data && res.data.type === "Admin") {
            setNewUser("Admin");
            setIsSuccessful(true);
          } else {
            if (res.data && res.data.type === "Estandar") {
              setNewUser(res.data.username);
              setIsSuccessful(true);
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleClean();
  };

  const handleClean = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClose = () => {
    setModal(false);
    setIsSuccessful(false);
  };

  return modal ? (
    <Modal>
      {isSuccessful ? (
        <div>
          <h2>
            Registro exitoso! Bienvenido/a{" "}
            <span style={{ color: "#39ff14" }}>@{newUser}</span> ;)
          </h2>
          <button className={"btn btn-danger"} onClick={handleClose}>
            Cerrar
          </button>
        </div>
      ) : (
        <div>
          <h2>Error: nombre de usuario y/o email ya registrado :(</h2>
          <button className={"btn btn-danger"} onClick={handleClose}>
            Cerrar
          </button>
        </div>
      )}
    </Modal>
  ) : (
    <div
      className={"h-100 w-100"}
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
              type="reset"
              className="btn btn-danger"
              onClick={handleClean}
            >
              Limpiar
            </button>

            <button type="button" className="btn btn-dark" onClick={handleBack}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
