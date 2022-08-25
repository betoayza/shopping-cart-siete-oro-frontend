import React, { useState } from "react";
import { ActivateUser } from "./ActivateUser";
import DeleteUser from "./DeleteUser";
import { Modal } from "./Modal";
import { SelectUsersCodes } from "./SelectUsersCodes";
import { SearchUser } from "./SearchUser";
import { UserTableRow } from "./UserTableRow";
import MainAdmin from "./MainAdmin";


export const UsersTable = ({ users, setUsers, showSearchUser = true }) => {
  const [userCode, setUserCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalActivate, setModalActivate] = useState(false);
  const [modalSearchUser, setModalSearchUser] = useState(false);

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
      {modalSearchUser && (
        <SearchUser
          code={userCode}
          setModal={setModal}
          setModalSearchUser={setModalSearchUser}
        />
      )}
    </Modal>
  ) : (
    <div>
      <MainAdmin />
      {showSearchUser && (
        <>
          <SelectUsersCodes
            users={users}
            setUserCode={setUserCode}
            setModal={setModal}
            setModalSearchUser={setModalSearchUser}
          />
        </>
      )}      
      {users.length === 1 ? <h2>Usuario:</h2> : <h2>Usuarios:</h2>}
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
  );
};
