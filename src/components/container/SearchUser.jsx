import React, { useState, useEffect } from "react";
import { Loader } from "../pure/Loader";
import { UserCard } from "../pure/UserCard";
import { helpAxios } from "../../helpers/helpAxios";

export const SearchUser = ({ code, setModal, setModalSearchUser }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const result = await helpAxios().getUser(code);

      if (result instanceof Error) setIsError(true);
      else setUser(result);

      setIsLoading(false);
    };
    getUser();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalSearchUser(false);
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h3 className="text-center">Error en la conexión :(</h3>
  ) : (
    user && (
      <div
        className={""}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <UserCard user={user} />

        <button className={"btn btn-danger mt-2"} onClick={handleClose}>
          Cerrar
        </button>
      </div>
    )
  );
};
