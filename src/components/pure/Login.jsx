import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";

const initialForm = {
  data: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [isError, setIsError] = useState(false);

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
      url: `${import.meta.env.VITE_API}/login`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
      params: form,
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
          setIsError(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleClean();
  };

  const handleClose = () => {
    setIsError(false);
  };

  return isError ? (
    <Modal>
      <div>
        <h2>Error: credenciales incorrectas o usuario banneado :(</h2>
        <button className={"btn btn-danger"} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  ) : (
    <div className={"vw-75 vh-100 d-grid align-items-center"}>
      <div
        className={"w-50 d-grid justify-content-center text-center container"}
      >
        <h2>Login</h2>

        <div className={"w-100 justify-content-md-center"}>
          <form onSubmit={handleSubmit} className={"container"}>
            <input
              type="text"
              className="form-control w-100"
              name="data"
              placeholder="Email o usuario..."
              value={form.data}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control w-100"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
