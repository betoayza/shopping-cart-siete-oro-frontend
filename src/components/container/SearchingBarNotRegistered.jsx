import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "../pure/Modal";
import { ProductsTableNotUsers } from "../pure/ProductsTableNotUsers";
import { helpAxios } from "../../helpers/helpAxios";

export const SearchingBarNotRegistered = () => {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isModalActivated, setIsModalActivated] = useState(false);
  const [isError, setIsError] = useState(false);

  const findProducts = useCallback(async (term) => {
    try {
      const foundProducts = await helpAxios().findProducts(term);
      const validProducts = foundProducts.filter(
        (product) => product.stock > 0
      );

      setProducts(validProducts);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsModalActivated(true);
    }
  }, [term]);

  useEffect(() => {
    if (term !== "") findProducts(term);
    else handleClose();
  }, [findProducts]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setIsModalActivated(false);
    setProducts([]);
    setIsError(false);
  };

  return (
    <div className={"text-center searching-bar-div"}>
      <h1>Panadería Siete de Oro</h1>
      <input
        className={"form-control w-50"}
        value={term}
        placeholder={"¿Qué está buscando?..."}
        onChange={handleChange}
      />
      {isModalActivated ? (
        <Modal>
          {isError ? (
            <div>
              <h2 style={{ color: "#ff4500" }}>Error en la conexión :(</h2>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          ) : (
            <div className={"col container vh-100"}>
              <div className={"w-100 d-flex flex-wrap justify-content-center"}>
                <input
                  className={"form-control"}
                  style={{ width: "50%" }}
                  value={term}
                  placeholder={"¿Qué está buscando?..."}
                  onChange={handleChange}
                />
              </div>
              <div className={"row"}>
                {products.length ? (
                  <ProductsTableNotUsers products={products} />
                ) : (
                  <h2 style={{ color: "white" }}>Sin resultados :(</h2>
                )}
              </div>
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
};
