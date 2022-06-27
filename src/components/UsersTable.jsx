import React from "react";

export const UsersTable = ({users}) => {   
  
    return (
    <div>
      <h1>Usuarios encontrados:</h1>
      <table id="users-table" className="table table-success">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Foto</th>
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
