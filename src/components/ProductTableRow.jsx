import React from 'react'

export const ProductTableRow = ({product}) => {
  return (
    <>
        <tr>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>{product.image}</td>
        <td>{product.status}</td>
      </tr>
    </>
  )
}