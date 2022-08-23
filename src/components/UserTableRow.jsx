import React from "react";

export const UserTableRow = ({ user, handleDelete, handleActivate }) => {
  return (
    <tr>
      <td>{user.code}</td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      {/*Doesn't' render password */}
      <td>{user.address}</td>
      <td>{user.neighborhood}</td>
      <td>{user.phone}</td>
      <td>{user.zip}</td>
      <td>{user.type}</td>
      <td>{user.status}</td>
      <td>
        {user.type === "Estandar" && (
          <>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user.code)}
            >
              Borrar
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleActivate(user.code)}
            >
              Activate
            </button>
          </>
        )}
      </td>
    </tr>
  );
};
