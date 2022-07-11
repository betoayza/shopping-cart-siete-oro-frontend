import axios from "axios";
import React, { useState } from "react";

const initialForm = {
  code: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  status: "Active",
};

const ModifyProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [product, setProduct] = useState(null);
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: '/api/admin/products/search/code',
     
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
          setProduct(res.data);
          setForm(res.data);
          alert("Producto encontrado!");
        } else {
          alert("No hay coincidencias :(");
        }
      })
      .catch((error) => error);
    handleReset();
  };

  const handleReset = (e) => {
    setCode("");
  };

  //---------
  //Handle Update Form
  const handleChange2 = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const options = {
      url: "/api/cars/modify",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: form,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {          
          alert("Producto actualizado!");
        } else {
          alert("Error en la actualización :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleReset2();
  };

  const handleReset2 = (e) => {
    setForm(initialForm);
  };

  return (
    <>
      <h2>Codigo producto: </h2>
      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              name="code"
              placeholder="Code..."
              value={code}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Find!
          </button>

          <button className="btn btn-danger" type="reset" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>

      {product && (
        <div>
          <h1>Modifique Producto:</h1>
          <div className="form-group w-25">
            <form onSubmit={handleSubmit2}>
              <div className="input-group mb-3">
                {/* code isnt updatable */}
                <label>Codigo: {form.code}</label>
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
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Update
              </button>

              <button
                className="btn btn-danger"
                type="reset"
                onClick={handleReset2}
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifyProduct;
