import axios from "axios";
import React, { useRef, useState } from "react";

const initialForm = {
  code: Date.now(),
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  status: "Activo",
};

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
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
          alert("Alta exitosa!");
        } else {
          alert("Alta fallida :(");
        }
      })
      .catch((error) => error);
    handleClean();

    // await axios.post("https://httpbin.org/anything", data).then(res=>console.log(res)).catch(error=>error)
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClean = (e) => {
    setForm({ ...initialForm, code: Date.now() });
  };

  return (
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
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Send
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={handleClean}
              >
                Clean
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
