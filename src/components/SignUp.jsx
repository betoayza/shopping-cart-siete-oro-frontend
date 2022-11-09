import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API } from "../api/api";

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

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: `${API}/signup`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      data: form,
      timeout: 3000,
    };
    console.log(form);

    await axios
      .request(options)
      .then((res) => {
        console.log(res);
        if (!res.data) {
          alert("Ya hay un usuario registrado con este mail o usuario :(");
        } else {
          if (res.data.type === "Admin") {
            alert("Administrador creado!");
          } else {
            if (res.data.type === "Estandar") {
              alert("Usuario registrado!");
              console.log("Los datos son: ", res.data);
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

  return (
    <div className={"h-100 w-100"}>
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
