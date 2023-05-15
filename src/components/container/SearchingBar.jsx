import React, { useEffect, useState } from "react";
import { helpAxios } from "../../helpers/helpAxios";

const SearchingBar = ({
  term = "",
  setTerm,
  setProducts,
  setModal,
  setModalSearchProducts,
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getProductsUser = async () => {
      const productsUser = await helpAxios().findProducts(term);

      if (productsUser instanceof Error) setIsError(true);
      else {
        setProducts(productsUser);
        setModal(true);
        setModalSearchProducts(true);
      }
    };

    if (term != "") getProductsUser();
    else {
      setProducts([]);
      setModal(false);
      setModalSearchProducts(false);
    }
  }, [term]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return isError ? (
    <h3>Error en la conexión :(</h3>
  ) : (
    <div className={"vw-100 text-center searching-bar-div col-md-auto"}>
      <h1 style={{ color: "#6610f2" }}>Panadería Siete de Oro</h1>

      <input
        className={"form-control"}
        style={{ width: "50%" }}
        value={term}
        placeholder={"¿Qué está buscando?..."}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchingBar;
