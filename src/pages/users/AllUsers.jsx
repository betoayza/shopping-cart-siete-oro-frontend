import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersTable } from "../../components/container/UsersTable";
import { Loader } from "../../components/pure/Loader";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
      };

      await axios
        .get(`${import.meta.env.VITE_API}/admin/users/all`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUsers(res.data);
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    getAllUsers();
  }, [users]);

  return loader ? (
    <Loader />
  ) : (
    <div className={"h-auto vw-100"}>
      {users && <UsersTable users={users} setUsers={setUsers} />}
    </div>
  );
};
