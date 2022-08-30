import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersTable } from "./UsersTable";

export const SearchUser = ({ code, setModal, setModalSearchUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
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
        .get("/api/admin/users/search/one", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setUser(res.data);
        })
        .catch((error) => error);
    };
    getUser();
  }, [user]);

  const handleClose = () => {
    setModal(false);
    setModalSearchUser(false);
  };

  return (
    user && (
      <>
        <UsersTable
          users={user}
          setUsers={setUser}
          showSearchUserAndAdminNavBar={false}
        />
        <button className="btn btn-danger" onClick={handleClose}>
          Cerrar
        </button>
      </>
    )
  );
};
