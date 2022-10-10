import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      url: "/api/login",
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
            navigate(`/user/${code}`);
            //case admin
          } else {
            navigate("/admin");
          }
        } else {
          alert("Error: credenciales incorrectas! :(");
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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          name="data"
          placeholder="Email o usuario..."
          value={form.data}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password..."
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          <i
            className="bi-box-arrow-in-right"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>

        <button type="reset" className="btn btn-danger" onClick={handleClean}>
          <i
            className="bi-x-circle-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>

        <button type="button" className="btn btn-dark" onClick={handleBack}>
          <i
            className="bi-arrow-left-square-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </form>
    </div>
  );
};

export default Login;
