import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "../pure/Modal";
import { NavBarUser } from "./NavBarUser";
import { helpAxios } from "../../helpers/helpAxios";

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
  const [isError, setIsError] = useState(false);

  const params = useParams();
  // console.log(params);
  const { code, username } = params;
  // console.log(code);

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfile = await helpAxios().getUserProfile(code);
      console.log(userProfile);

      if (userProfile instanceof Error) setIsError(true);
      else setForm(userProfile);
    };

    getUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isOk = await helpAxios().modifyProfile(form);

    if (isOk instanceof Error) setIsError(true);
    setModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setModal(false);
    setIsError(false);
  };

  return modal ? (
    <Modal>
      <div>
        {isError ? <h3>Error de conexión :(</h3> : <h3>Actualizado!</h3>}
        <button className="btn btn-danger" onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  ) : (
    <div className={"w-100 h-auto"}>
      <NavBarUser code={code} username={username} />
      <div
        className={"w-100 h-auto"}
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className={""}>
          <div className={"form-group w-100"}>
            <h2>Mis datos:</h2>
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

              <button type={"submit"} className={"btn btn-primary mt-2"}>
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
