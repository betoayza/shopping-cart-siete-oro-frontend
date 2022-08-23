import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import { Modal } from "./Modal";
import { UserTableRow } from "./UserTableRow";

export const UsersTable = ({ users, setUsers }) => {
  const [userCode, setUserCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  if (!Array.isArray(users)) {
    users = [users];
  }

  const handleDelete = (userCode) => {
    setModal(true);
    setModalDelete(true);
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
    </Modal>
  ) : (
    <div>
      <h1>Usuarios encontrados:</h1>
      <table id="users-table" className="table table-hover table-light">
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
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
