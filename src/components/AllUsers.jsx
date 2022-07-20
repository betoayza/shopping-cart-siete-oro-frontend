import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersTable } from "./UsersTable";
import UserOrders from "./UserOrders";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);

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
        .get("/api/admin/users/all", options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUsers(res.data);
            alert("Users found!");
          } else alert("No users yet :(");
        })
        .catch((error) => error);
    };
    getAllUsers();
  }, []);

  return <div>{users && <UsersTable users={users} setUsers={setUsers} />}</div>;
};
