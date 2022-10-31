import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      url: "/api/signup",
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
    <div className={"d-grid justify-content-center"}>
      <h1>Regístrese</h1>

      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            className="form-control"
            name="code"
            value={form.code}
          />

          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nombre..."
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Apellido..."
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email..."
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Nombre usuario..."
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Direccion..."
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control"
            name="neighborhood"
            placeholder="Barrio..."
            value={form.neighborhood}
            onChange={handleChange}
          />

          <input
            type="phone"
            className="form-control"
            name="phone"
            placeholder="Tel..."
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control"
            name="zip"
            placeholder="CP..."
            value={form.zip}
            onChange={handleChange}
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
