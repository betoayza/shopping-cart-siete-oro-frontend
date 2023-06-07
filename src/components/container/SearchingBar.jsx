import React, { useEffect, useState, useCallback } from "react";
import { helpAxios } from "../../helpers/helpAxios";
import { Loader } from "../pure/Loader";

const SearchingBar = ({
  term = "",
  setTerm,
  setProducts,
  setModal,
  setModalSearchProducts,
}) => {
  const [isError, setIsError] = useState(false);

  const getProductsUser = useCallback(async () => {
    try {
      const productsUser = await helpAxios().findProducts(term);

      if (Object.prototype.toString.call(productUser) === "[object Error]")
        throw new Error();

      setProducts(productsUser);
      setModal(true);
      setModalSearchProducts(true);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }, [term]);

  useEffect(() => {
    if (term != "") getProductsUser();
    else {
      setProducts([]);
      setModal(false);
      setModalSearchProducts(false);
    }
  }, [getProductsUser]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return isError ? (
    <Loader />
  ) : (
    <div className={"vw-100 text-center searching-bar-div col-md-auto"}>
      <h1 style={{ color: "maroon" }}>Panadería Siete de Oro</h1>

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
