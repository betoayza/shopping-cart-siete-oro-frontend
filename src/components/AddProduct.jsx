import axios from "axios";
import React, { useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const initialForm = {
  code: Date.now(),
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  status: "Activo",
};

export const AddProduct = ({ setModal, setModalAddProduct, setProducts }) => {
  const [form, setForm] = useState(initialForm);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const data = new FormData();
    data.append("code", form.code);
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("toBuy", 1);
    data.append("status", form.status);
    data.append("image", form.image);
    console.log(data);

    const options = {
      url: "/api/admin/product/add",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: data,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAdded(true);

          const getAllProducts = async () => {
            const options = {
              url: "/api/products/all",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                Accept: "application/json",
              },
              timeout: 3000,
            };

            await axios
              .request(options)
              .then((res) => {
                console.log(res.data);
                if (res.data) {
                  setProducts(res.data);
                } else return;
              })
              .catch((error) => error);
          };
          getAllProducts();
        } else setError(true);
      })
      .catch((error) => error);
    handleClean();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClean = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  const handleClose = () => {
    setModal(false);
    setModalAddProduct(false);
  };

  return error ? (
    <div>
      <h3>Alta fallida :(</h3>
      <button type="reset" className="btn btn-danger" onClick={handleClose}>
        Cerrar
      </button>
    </div>
  ) : !added ? (
    <div>
      <h2>Agregar Producto:</h2>

      <div className="form-group w-25">
        <form>
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
              required
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Descripcion..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3">
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Precio..."
              value={form.price}
              min={1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3">
            <input
              type="number"
              className="form-control"
              name="stock"
              placeholder="Stock..."
              value={form.stock}
              min={1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3">
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
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Agregar
              </button>
              <button
                type="reset"
                className="btn btn-warning"
                onClick={handleClean}
              >
                Limpiar
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>
      <h3>Alta exitosa :)</h3>
      <button type="reset" className="btn btn-danger" onClick={handleClose}>
        Cerrar
      </button>
    </div>
  );
};
