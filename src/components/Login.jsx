import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  data: "",  
  password: ""
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uri = "/login";
    await axios
      .post(uri, form)
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert("Logueo exitoso!");
          console.log("Usuario: ", res.data.email, ", bienvenido!");
          const uri = "/user";
          const userData=res.data;
          navigate(uri, {state: {userData}});
        } else {
          alert("Error: credenciales incorrectas! :(");
        }
      })
      .catch((error) => {       
        console.error(error);
      });
      handleReset();
  };

  return (
    <>
      <h2>Login</h2>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="data"
              placeholder="Email o usuario..."
              value={form.data}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password..."
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
