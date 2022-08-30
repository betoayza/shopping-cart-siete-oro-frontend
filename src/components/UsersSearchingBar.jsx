import axios from "axios";
import React, { useEffect, useState } from "react";
import { UsersTable } from "./UsersTable";

export const UsersSearchingBar = ({
  users,
  setUsers,
  setModal,
  setModalSearchUsers,
}) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { term },
      };

      await axios
        .get("/api/admin/users/search", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setUsers(res.data);        
        })
        .catch((error) => error);
    };
    getUsers();
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setModal(false);
    setModalSearchUsers(false);
    setTerm(null);
  };

  return (
    <div className={"searching-bar"}>
      <div>
        <input
          type={"text"}
          placeholder={"Buscar..."}
          className={"form-control w-100"}
          value={term}
          onChange={handleChange}
        />
      </div>

      {!term && (
        <button
          type={"button"}
          className={"btn btn-danger"}
          onClick={handleClose}
        >
          Cerrar
        </button>
      )}

      {users && term !== "" && (
        <>
          <UsersTable
            users={users}
            setUsers={setUsers}
            showSearchUserAndAdminNavBar={false}
          />
          <button
            type={"button"}
            className={"btn btn-danger"}
            onClick={handleClose}
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
};
