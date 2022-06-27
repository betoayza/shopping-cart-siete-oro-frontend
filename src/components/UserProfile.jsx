import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const initialForm = {
  code: "",
  name: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  address: "",
  neighborhood: "",
  phone: "",
  zip: "",
  status: "Activo",
};

const UserProfile = () => {
  const [form, setForm] = useState(initialForm);
  let location = useLocation();
  const userData = location.state.userData;
  const { code } = userData;
  console.log("Datos usuario profile: ", userData);

  useEffect(() => {
    const formAux = {
      code: userData.code,
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      address: userData.address,
      neighborhood: userData.neighborhood,
      phone: userData.phone,
      zip: userData.zip,
      status: userData.status,
    };
    setForm(formAux);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uri = "/user/profile/edit";
    await axios
      .put(uri, { form })
      .then((res) => {
        alert("Datos actualizados!");
        console.log("Ahora el usuario tiene estos datos: ", res.data);
      })
      .catch((error) => {
        alert("Un error ha ocurrido");
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <>
      <h2>Datos:</h2>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="hidden"
              className="form-control"
              name="code"
              value={code}
            />
          </div>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre..."
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Apellido..."
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email..."
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username..."
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="row">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Direccion..."
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              className="form-control"
              name="neighborhood"
              placeholder="Barrio..."
              value={form.neighborhood}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="phone"
              className="form-control"
              name="phone"
              placeholder="Tel..."
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              className="form-control"
              name="zip"
              placeholder="CP..."
              value={form.zip}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input type="hidden" className="form-control" name={form.status} />
          </div>

          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Actualizar
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

export default UserProfile;
