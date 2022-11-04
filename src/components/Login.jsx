import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API } from '../api/api';

const initialForm = {
  data: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClean = (e) => {
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      url: `${API}/login`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      params: form,
      timeout: 3000,
    };
    console.log(form);
    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          //case generic user
          if (res.data.type === "Estandar") {
            const code = res.data.code;
            const username = res.data.username;
            navigate(`/user/${username}/${code}`);
            //case admin
          } else {
            navigate("/admin");
          }
        } else {
          alert("Error: credenciales incorrectas o usuario banneado :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleClean();
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={"w-100 vh-100 d-grid align-items-center"}>
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control w-25"
            name="data"
            placeholder="Email o usuario..."
            value={form.data}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control w-25"
            name="password"
            placeholder="Password..."
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className={"d-flex m-1"}>
            <button type="submit" className="btn btn-primary">
              Entrar
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

export default Login;
