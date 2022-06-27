import axios from "axios";
import React, { useRef, useState } from "react";

const initialForm = {
  code: Date.now(),
  name: "",
  description: "",
  price: "",
  stock: "",
  image: null,
  status: "Active",
};

const AddProduct2 = () => {
  const [form, setForm] = useState(initialForm);
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uri = "/admin/product/add";
    console.log(form);

    await axios
      .post(uri, form)
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert("Alta exitosa!");
        } else {
          alert("Alta fallida :(");
        }
      })
      .catch((error) => error);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  return (
    <div>
      <h2>Agregar Producto:</h2>

      <div className="form-group w-25">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
              name="description"
              placeholder="Descripcion..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Precio..."
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              name="stock"
              placeholder="Stock..."
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <input
              type="file"
              className="form-control"
              name="image"
              ref={fileRef}
              onChange={(e) => {
                console.log(e.target.files[0]);
                setForm({ ...form, image: e.target.files[0] });
              }}
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
    </div>
  );
};

export default AddProduct2;
