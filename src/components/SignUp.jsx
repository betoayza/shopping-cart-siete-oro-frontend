import React, { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();    
    
    const options = {
      url: "/api/signup",    
      method: 'post', 
      headers: {
       'Content-Type': 'application/json', 
       'Access-Control-Allow-Origin': '*',   
       'Access-Control-Allow-Headers': '*',
       Accept: 'application/json',    
      },
      data: form,   
      timeout: 3000,         
   }
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
      }})
      .catch((error) => {
        console.error(error);
      });
    handleReset();
  };

  const handleReset = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Regístrese</h1>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="hidden"
              className="form-control"
              name="code"
              value={form.code}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre..."
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Apellido..."
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email..."
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Nombre usuario..."
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Direccion..."
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="neighborhood"
              placeholder="Barrio..."
              value={form.neighborhood}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="phone"
              className="form-control"
              name="phone"
              placeholder="Tel..."
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="zip"
              placeholder="CP..."
              value={form.zip}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="hidden"
              className="form-control"
              name="type"
              value={form.type}
            />
          </div>

          <div className="row mb-3">
            <input
              type="hidden"
              className="form-control"
              name="status"
              value={form.status}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
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

export default SignUp;
