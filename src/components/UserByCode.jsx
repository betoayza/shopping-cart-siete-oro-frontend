import React, { useState } from "react";
import axios from "axios";
import { UsersTable } from "./UsersTable";

const UserByCode = () => {
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

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
      params: { code },
    };

    await axios
      .get("/api/admin/users/code", options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
          alert("Usuario encontrado!");
        } else alert("Sin coincidencias :(");
      })
      .catch((error) => error);
    handleClean();
  };

  const handleClean = (e) => {
    setCode("");
  };

  return (
    <div>
      <h2> Buscar usuario: </h2>

      <div className="form-group w-25">
        <form onSubmit={handleSubmit}>
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
            Send!
          </button>

          <button className="btn btn-danger" type="Clean" onClick={handleClean}>
            Clean
          </button>
        </form>
      </div>
      <br />
      <br />
      {user && <UsersTable users={user} setUsers={setUser} />}
    </div>
  );
};

export default UserByCode;
