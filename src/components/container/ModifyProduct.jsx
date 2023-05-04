import React, { useState, useRef, useEffect } from "react";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

const initialForm = {
  code: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  status: "",
};

export const ModifyProduct = ({ code, setModal, setModalModifyProduct }) => {
  const [form, setForm] = useState(initialForm);
  const [found, setFound] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [loader, setLoader] = useState(true);
  const fileRef = useRef(null);

  useEffect(() => {
    const getProduct = async () => {
      const result = await helpAxios().getProduct(code);

      if (!(result instanceof Error)) {
        setForm(result);
        setFound(true);
      }

      setLoader(false);
    };

    getProduct();
  }, []);

  const handleChange2 = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("code", form.code);
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("status", form.status);
    data.append("image", form.image);
    console.log(data);

    const result = await helpFetchs().modifyProduct(data);

    if (!(result instanceof Error)) setUpdated(result);

    handleClean2();
  };

  const handleClean2 = () => {
    setForm(initialForm);
  };

  const handleClose = () => {
    setModal(false);
    setModalModifyProduct(false);
    setFound(false);
    setUpdated(false);
  };

  return !updated ? (
    !loader && found ? (
      <div
        className={"text-center vh-100"}
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className={"d-flex justify-content-center"}>
          <div className="form-group w-75">
            <h1>Actualizar producto:</h1>
            <form onSubmit={handleUpdate}>
              <div className="input-group mb-3">
                {/* code isnt updatable */}
                <input
                  type="number"
                  name="code"
                  value={form.code}
                  className="form-control"
                  disabled
                  readOnly
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Nombre..."
                  value={form.name}
                  onChange={handleChange2}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Descripcion..."
                  value={form.description}
                  onChange={handleChange2}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Precio..."
                  value={form.price}
                  onChange={handleChange2}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  placeholder="Stock..."
                  value={form.stock}
                  onChange={handleChange2}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="image"
                  ref={fileRef}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setForm({ ...form, image: e.target.files[0] });
                  }}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Actualizar
              </button>
              <button
                className="btn btn-danger mt-1"
                type="reset"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    )
  ) : (
    <div>
      <h3>Actualizado :)</h3>
      <button className="btn btn-danger" type="reset" onClick={handleClose}>
        Cerrar
      </button>
    </div>
  );
};
