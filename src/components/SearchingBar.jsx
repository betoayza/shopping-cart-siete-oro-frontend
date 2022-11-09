import React, { useEffect } from "react";
import axios from "axios";
import { API } from "../api/api";

const SearchingBar = ({
  term = "",
  setTerm,
  setProducts,
  setModal,
  setModalSearchProducts,
}) => {
  useEffect(() => {
    const getProducts = async () => {
      const options = {
        url: `${API}/products/get`,

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { term },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setProducts(res.data);
            setModal(true);
            setModalSearchProducts(true);
          }
        })
        .catch((error) => error);
    };
    if (term !== "") getProducts();
    else {
      setProducts([]);
      setModal(false);
      setModalSearchProducts(false);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
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
