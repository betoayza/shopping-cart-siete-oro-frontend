import React from "react";
import { UserTableRow } from "./UserTableRow";

export const UsersTable = ({ users }) => {
  return (
    <div>
      <h1>Usuarios encontrados:</h1>
      <table id="users-table" className="table table-success">
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
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return <UserTableRow key={user._id} user={user} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
