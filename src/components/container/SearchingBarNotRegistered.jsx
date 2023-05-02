import React, { useEffect, useState } from "react";
import { Modal } from "../pure/Modal";
import { ProductsTableNotUsers } from "../pure/ProductsTableNotUsers";
import { helpAxios } from "../../helpers/helpAxios";

export const SearchingBarNotRegistered = () => {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState(null);
  const [isModalActivated, setIsModalActivated] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const findProducts = async (term) => {
      const foundProducts = await helpAxios().findProducts(term);

      if (foundProducts instanceof Error) setIsError(true);
      else setProducts(foundProducts);

      setIsModalActivated(true);
    };

    if (term !== "") findProducts(term);
    else handleClose();
  }, [term]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleClose = () => {
    setIsModalActivated(false);
    setProducts(null);
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
            products && (
              <div className={"col container vh-100"}>
                <div
                  className={"w-100 d-flex flex-wrap justify-content-center"}
                >
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
                    <h2>Sin resultados :(</h2>
                  )}
                </div>
              </div>
            )
          )}
        </Modal>
      ) : null}
    </div>
  );
};
