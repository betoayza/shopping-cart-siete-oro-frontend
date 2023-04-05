import React, { useState, useEffect } from "react";
import { UsersTable } from "../../components/container/UsersTable";
import { Loader } from "../../components/pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      const result = await helpAxios().getAllUsers();
      console.log(result);

      if (result instanceof Error) setIsError(true);
      else setUsers(result);

      setLoader(false);
    };

    getAllUsers();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className={"h-auto vw-100"}>
      {isError ? (
        <h2>
          <span style={{ color: "maroon" }}>Error en la conexión :(</span>
        </h2>
      ) : users.length ? (
        <UsersTable users={users} />
      ) : (
        <h2>No hay usuarios :(</h2>
      )}
    </div>
  );
};
