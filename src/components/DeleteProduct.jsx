import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from '../api/api';

const DeleteProduct = ({ code, setModal, setModalDeleteProduct, setProducts }) => {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const deleteProduct = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        data: { code },
      };

      await axios
        .delete(`${API}/admin/products/delete`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) setDeleted(true);
        })
        .catch((error) => error);
    };
    deleteProduct();

    if (deleted) {
      const getAllProducts = async () => {
        const options = {
          url: `${API}/products/all`,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/json",
          },
          timeout: 3000,
        };

        await axios
          .request(options)
          .then((res) => {
            console.log(res.data);
            if (res.data) setProducts(res.data);
          })
          .catch((error) => error);
      };
      getAllProducts();
    }
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDeleteProduct(false);
  };

  return deleted ? (
    <>
      <h3>Baja exitosa ;)</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Close
      </button>
    </>
  ) : (
    <>
      <h3>Ya estaba dado de baja</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Close
      </button>
    </>
  );
};

export default DeleteProduct;
