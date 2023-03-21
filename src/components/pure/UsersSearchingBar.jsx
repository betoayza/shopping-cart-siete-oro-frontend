import axios from "axios";
import React, { useEffect } from "react";
import { UsersTable } from "../container/UsersTable";

export const UsersSearchingBar = ({
  term,
  setTerm,
  users,
  setUsers,
  setModal,
  setModalSearchUsers,
  isModalStyle = false,
}) => {

  useEffect(() => {
    const getUsers = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        params: { term },
      };

      await axios
        .get(`${import.meta.env.VITE_API}/admin/users/search`, options)
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
  }, [term, users]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"searching-bar"}>
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
            isModalStyle={isModalStyle}
          />
        </div>
      )}
    </div>
  );
};
