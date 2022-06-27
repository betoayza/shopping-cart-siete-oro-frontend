import React from 'react'

export const UserTableRow = ({user}) => {
  return (
    <div>
        <tr>
        <td>{user.code}</td>
        <td>{user.name}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{user.password}</td>
        <td>{user.address}</td>
        <td>{user.neighborhood}</td>
        <td>{user.phone}</td>
        <td>{user.zip}</td>
        <td>{user.type}</td>
        <td>{user.status}</td>
      </tr>
    </div>
  )
}
