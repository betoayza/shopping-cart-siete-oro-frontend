import React, { useState, useEffect } from "react";
import { Loader } from "../pure/Loader";
import { helpAxios } from "../../helpers/helpAxios";

const DeleteProduct = ({
  code,
  setModal,
  setModalDeleteProduct,
  setProducts,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const deleteProduct = async () => {
      const result = await helpAxios().deleteProduct(code);

      if (result instanceof Error) setIsError(true);
      else {
        setIsDeleted(true);
        setLoader(false);
        const allProducts = await helpAxios().getAllProducts();
        setProducts(allProducts);
      }
    };
    deleteProduct();
  }, []);

  const handleClose = () => {
    setModal(false);
    setModalDeleteProduct(false);
  };

  return loader ? (
    <Loader />
  ) : isError ? (
    <h2>Error de conexión :(</h2>
  ) : isDeleted ? (
    <div>
      <h3>Baja exitosa ;)</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Cerrar
      </button>
    </div>
  ) : (
    <div>
      <h3>Ya estaba dado de baja</h3>
      <button className="btn btn-danger" type="button" onClick={handleClose}>
        Cerrar
      </button>
    </div>
  );
};

export default DeleteProduct;
