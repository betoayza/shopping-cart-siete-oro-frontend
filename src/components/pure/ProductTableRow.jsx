import React from "react";

export const ProductTableRow = ({
  product,
  handleUpdate,
  handleDelete,
  handleActivate,
  seeActions,
}) => {

  const toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <tr>
      <td>{product.code}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>${product.price}</td>
      <td>{product.stock}</td>
      <td>
        <img
          src={"data:image/png;base64," + toBase64(product.image.data)}
          alt="Producto"
          height={150}
          width={200}
        />
      </td>
      <td>{product.status}</td>
      {seeActions && (
        <td>
          <button
            className="btn btn-primary"
            onClick={() => handleUpdate(product.code)}
          >
            <i
              className="bi-pen-fill"
              style={{ color: "white", fontSize: "20px" }}
            ></i>
          </button>
          {product.status === "Activo" && (
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(product.code)}
            >
              <i
                className="bi-trash-fill"
                style={{ color: "white", fontSize: "20px" }}
              ></i>
            </button>
          )}
          {product.status === "Dado de baja" && (
            <button
              className="btn btn-success"
              onClick={() => handleActivate(product.code)}
            >
              <i
                className="bi-plus-lg"
                style={{ color: "white", fontSize: "20px" }}
              ></i>
            </button>
          )}
        </td>
      )}
    </tr>
  );
};
