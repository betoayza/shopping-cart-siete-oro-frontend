import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { helpAxios } from "../../helpers/helpAxios";
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
    console.log(form);
    const user = await helpAxios().login(form);

    console.log(user);
    if (user instanceof Error) setIsError(true);
    else {
      //case generic user
      if (user.type === "Estandar")
        navigate(`/user/${user.username}/${user.code}`);
      //case admin
      else navigate("/admin");
    }

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
