import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteOrder = () => {
  const [code, setCode] = useState("");
  const params = useParams();
  const { userCode } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { code, userCode },
    };

    await axios
      .delete("/api/user/orders/delete", options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Baja exitosa!");
        } else {
          alert("Sin coincidencias :(");
        }
      })
      .catch((error) => error);
    handleClean();
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleClean = (e) => {
    setCode("");
  };

  return (
    <div>
      <h1>Codigo Pedido:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group w-25">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              name="code"
              placeholder="Codigo..."
              value={code}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Eliminar
          </button>

          <button className="btn btn-danger" type="reset" onClick={handleClean}>
            Clean
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteOrder;
