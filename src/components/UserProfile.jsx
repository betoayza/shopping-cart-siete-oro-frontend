import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { NavBarUser } from "./NavBarUser";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  address: "",
  neighborhood: "",
  phone: "",
  zip: "",
};

const UserProfile = () => {
  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);

  const params = useParams();
  console.log(params);
  const { code } = params;
  console.log(code);

  useEffect(() => {
    const getUser = async () => {
      const options = {
        url: "/api/admin/users/search/one",

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
            setForm(res.data);
          }
        })
        .catch((error) => error);
    };
    getUser();
  }, [updated]);

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

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setModal(true);
          setUpdated(true);
        } else {
          setModal(true);
          setError(true);
          setUpdated(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleClean = () => {
  //   setForm(initialForm);
  // };

  const handleClose = () => {
    setModal(false);
    setError(false);
    setUpdated(false);
  };

  return error ? (
    <Modal>
      <h3>Actualización fallida :(</h3>
      <button className="btn btn-danger" onClick={handleClose}>
        Cerrar
      </button>
    </Modal>
  ) : updated ? (
    <Modal>
      <h3>Actualizado! ;)</h3>
      <button className="btn btn-danger" onClick={handleClose}>
        Cerrar
      </button>
    </Modal>
  ) : (
    <div className={"w-100"}>
      {console.log(code)}
      <NavBarUser code={code} />
      <div className={"general-div w-100 vh-100"}>
        <div className={"general-div vh-50"}>
          <h2>Mis datos:</h2>
          {/* <div className={"form-group w-50"}> */}
          <form onSubmit={handleSubmit}>
            <input
              type={"hidden"}
              className={"form-control w-75"}
              name={"code"}
              value={code}
            />

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre..."
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Apellido..."
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email..."
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username..."
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Direccion..."
              value={form.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control"
              name="neighborhood"
              placeholder="Barrio..."
              value={form.neighborhood}
              onChange={handleChange}
              required
            />

            <input
              type="phone"
              className="form-control"
              name="phone"
              placeholder="Tel..."
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              className="form-control"
              name="zip"
              placeholder="CP..."
              value={form.zip}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
            {/* <button type="reset" className="btn btn-danger" onClick={handleClean}>
            Cerrar
          </button> */}
          </form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
