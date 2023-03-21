import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "../pure/Loader";

const DeleteProduct = ({
  code,
  setModal,
  setModalDeleteProduct,
  setProducts,
}) => {
  const [deleted, setDeleted] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const deleteProduct = async () => {
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        timeout: 3000,
        data: { code },
      };

      await axios
        .delete(`${import.meta.env.VITE_API}/admin/products/delete`, options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setDeleted(true);
            setLoader(false);
          }
        })
        .catch((error) => error);
    };
    deleteProduct();

    if (deleted) {
      const getAllProducts = async () => {
        const options = {
          url: `${import.meta.env.VITE_API}/products/all`,
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

  return loader ? (
    <Loader />
  ) : deleted ? (
    <>
      <h3>Baja exitosa ;)</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Cerrar
      </button>
    </>
  ) : (
    <>
      <h3>Ya estaba dado de baja</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Cerrar
      </button>
    </>
  );
};

export default DeleteProduct;
