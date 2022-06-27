import React from 'react'

export const OrderTableRow = ({order}) => {
  return (
    <div>
        <tr>
        <td>{order.code}</td>
        <td>{order.userCode}</td>
        <td>{order.products}</td>
        <td>{order.amount}</td>
        <td>{order.date}</td>
        <td>{order.state}</td>
      </tr>
    </div>
  )
}
