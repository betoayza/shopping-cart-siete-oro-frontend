import React, { useState } from "react";
import { ActivateUser } from "./ActivateUser";
import DeleteUser from "./DeleteUser";
import { Modal } from "../pure/Modal";
import { UserTableRow } from "../pure/UserTableRow";
import { UsersSearchingBar } from "../pure/UsersSearchingBar";
import { NavBarAdmin } from "../pure/NavBarAdmin";

export const UsersTable = ({
  users,
  setUsers,
  showSearchUserAndAdminNavBar = true,
  isModalStyle = false,
}) => {
  const [userCode, setUserCode] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalActivate, setModalActivate] = useState(false);
  const [modalSearchUsers, setModalSearchUsers] = useState(false);
  const [usersFound, setUsersFound] = useState(null);
  const [term, setTerm] = useState("");

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
          setUsers={setUsers}
        />
      )}
      {modalActivate && (
        <ActivateUser
          code={userCode}
          setModal={setModal}
          setModalActivate={setModalActivate}
          setUsers={setUsers}
        />
      )}
      {modalSearchUsers && (
        <UsersSearchingBar
          term={term}
          setTerm={setTerm}
          users={usersFound}
          setUsers={setUsersFound}
          setModal={setModal}
          setModalSearchUsers={setModalSearchUsers}
          isModalStyle={true}
        />
      )}
    </Modal>
  ) : (
    <div>
      {showSearchUserAndAdminNavBar && (
        <div>
          <NavBarAdmin />
          <UsersSearchingBar
            term={term}
            setTerm={setTerm}
            users={usersFound}
            setUsers={setUsersFound}
            setModal={setModal}
            setModalSearchUsers={setModalSearchUsers}
          />
        </div>
      )}
      {users.length === 1 ? <h2>Usuario:</h2> : <h2>Usuarios:</h2>}
      <div className={"mt-2"}>
        {users.length ? (
          <div className={"d-flex justify-content-center"}>
            <div
              className={"table-responsive overflow-auto"}
              style={{ width: "75%", maxHeight: "500px" }}
            >
              <table
                className={"table table-hover table-sm h-100"}
                style={isModalStyle ? { color: "#20c997" } : null}
              >
                <thead>
                  <tr>
                    <th scope="col">Código</th>
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
                  {users.map((user) => {
                    return (
                      <UserTableRow
                        key={user.code}
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
        ) : (
          <h2>Sin resultados :(</h2>
        )}
      </div>
    </div>
  );
};
