import React, { useState, useEffect, useCallback } from "react";
import { UsersTable } from "../../components/container/UsersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(true);
  const intervalTime = 5000;

  const getAllUsers = useCallback(async () => {    
    try {
      const allUsers = await helpAxios().getAllUsers();
      console.log(allUsers)

      setUsers(allUsers);
      setIsError(false);
    } catch (error) {
      console.error("ASDASDASASDASD")
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData();

    const interval = setInterval(fetchData, intervalTime);

    return () => clearInterval(interval);
  }, [getAllUsers]);

  return isError ? (
    <Loader />
  ) : (
    <div className={"h-auto vw-100"}>
      {users.length ? (
        <UsersTable users={users} />
      ) : (
        <h2>No hay usuarios :(</h2>
      )}
    </div>
  );
};
