import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

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
  const [user, setUser] = useState(false);
  const params = useParams();

  console.log(params);
  const { code } = params;
  console.log(code);

  useEffect(() => {
    const getUser = async () => {
      const options = {
        url: "/api/admin/users/search",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { code },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUser(true);
            setForm(res.data);
            alert("Datos recibidos!");
          } else {
            alert("Sin datos :(");
          }
        })
        .catch((error) => error);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "/api/user/profile/modify",
      method: "put",
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
        console.log(res.data);
        if(res.data){
          alert("Datos actualizados!");
        }else{
          alert("Error en la actualización :(");
        }        
      })
      .catch((error) => {        
        console.error(error);
      });
      handleReset();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setUser(false);
  };

  return (
    <div>
      {user && (
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
                <input
                  type="hidden"
                  className="form-control"
                  name={form.status}
                />
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
      )}
    </div>
  );
};

export default UserProfile;
