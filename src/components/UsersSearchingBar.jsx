import axios from "axios";
import React, { useEffect, useState } from "react";
import { UsersTable } from "./UsersTable";

export const UsersSearchingBar = ({
  term,
  setTerm,
  users,
  setUsers,
  setModal,
  setModalSearchUsers,
}) => {
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
          if (res.data) {
            setUsers(res.data);
            setModal(true);
            setModalSearchUsers(true);
          }
        })
        .catch((error) => error);
    };
    if (term !== "") {
      getUsers();
    } else {
      setUsers(null);
      setModal(false);
      setModalSearchUsers(false);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"searching-bar border"}>
      <div className={"w-50"}>
        <input
          type={"text"}
          placeholder={"Buscar..."}
          className={"form-control w-100"}
          value={term}
          onChange={handleChange}
        />
      </div>

      {users && term !== "" && (
        <div className={"w-100"}>
          <UsersTable
            users={users}
            setUsers={setUsers}
            showSearchUserAndAdminNavBar={false}
          />
        </div>
      )}
    </div>
  );
};
