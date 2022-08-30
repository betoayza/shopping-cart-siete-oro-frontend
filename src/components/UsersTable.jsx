import React, { useState } from "react";
import { ActivateUser } from "./ActivateUser";
import DeleteUser from "./DeleteUser";
import { Modal } from "./Modal";
import { UserTableRow } from "./UserTableRow";
import MainAdmin from "./MainAdmin";
import { UsersSearchingBar } from "./UsersSearchingBar";

export const UsersTable = ({
  users,
  setUsers,
  showSearchUserAndAdminNavBar = true,
}) => {
  const [userCode, setUserCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalActivate, setModalActivate] = useState(false);
  const [modalSearchUsers, setModalSearchUsers] = useState(false);
  const [usersFound, setUsersFound] = useState(null);

  if (!Array.isArray(users)) {
    users = [users];
  }

  const handleDelete = (userCode) => {
    setModal(true);
    setModalDelete(true);
    setUserCode(userCode);
  };

  const handleActivate = (userCode) => {
    setModal(true);
    setModalActivate(true);
    setUserCode(userCode);
  };

  const handleSearchUsers = () => {
    setModal(true);
    setModalSearchUsers(true);
  };

  return modal ? (
    <Modal>
      {modalDelete && (
        <DeleteUser
          code={userCode}
          setModal={setModal}
          setModalDelete={setModalDelete}
        />
      )}
      {modalActivate && (
        <ActivateUser
          code={userCode}
          setModal={setModal}
          setModalActivate={setModalActivate}
        />
      )}
      {modalSearchUsers && (
        <UsersSearchingBar
          users={usersFound}
          setUsers={setUsersFound}
          setModal={setModal}
          setModalSearchUsers={setModalSearchUsers}
        />
      )}
    </Modal>
  ) : (
    <div>
      {showSearchUserAndAdminNavBar && (
        <>
          <MainAdmin />
          <button
            type={"button"}
            className={"btn btn-primary"}
            onClick={handleSearchUsers}
          >
            Buscar
          </button>
        </>
      )}
      {users.length === 1 ? <h2>Usuario:</h2> : <h2>Usuarios:</h2>}
      <div className={"table-responsive"}>
        <table className="table table-hover table-light">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Usuario</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Barrio</th>
              <th scope="col">Telefono</th>
              <th scope="col">C.P.</th>
              <th scope="col">Tipo</th>
              <th scope="col">Estado</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    handleDelete={handleDelete}
                    handleActivate={handleActivate}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
