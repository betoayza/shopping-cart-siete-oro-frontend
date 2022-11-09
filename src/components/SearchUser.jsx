import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersTable } from "./UsersTable";
import { API } from "../api/api";
import { Loader } from "./Loader";

export const SearchUser = ({
  code,
  setModal,
  setModalSearchUser,
  isModalStyle = false,
}) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

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
        .get(`${API}/admin/users/search/one`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUser(res.data);
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    getUser();
  }, [user]);

  const handleClose = () => {
    setModal(false);
    setModalSearchUser(false);
  };

  return !loader && user ? (
    <div>
      <UsersTable
        users={user}
        setUsers={setUser}
        showSearchUserAndAdminNavBar={false}
        isModalStyle={true}
      />
      <button className={"btn btn-danger mt-2"} onClick={handleClose}>
        Cerrar
      </button>
    </div>
  ) : (
    <Loader />
  );
};
