import React, { useState, useEffect } from "react";
import { UsersTable } from "../../components/container/UsersTable";
import { Loader } from "../../components/pure/Loader";
import { helpFetchs } from "../../helpers/helpFetchs";

export const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const result = await helpFetchs().getAllUsers();
      console.log(result);

      if (result) {
        setUsers(result);
        setLoader(false);
      }
    };

    getAllUsers()
  }, []);

  return loader ? (
    <Loader />
  ) : (
    users && (
      <div className={"h-auto vw-100"}>
        {users && <UsersTable users={users} />}
      </div>
    )
  );
};
