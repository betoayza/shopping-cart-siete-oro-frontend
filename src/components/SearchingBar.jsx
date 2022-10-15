import React, { useEffect } from "react";
import axios from "axios";

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
        url: "/api/products/get",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
          timeout: 3000,
        },
        params: { term },
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
      setProducts(null);
      setModal(false);
      setModalSearchProducts(false);
    }
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"w-100 text-center searching-bar-div"}>
      <h1>Panadería Siete de Oro</h1>

      <input
        className={"form-control"}
        style={{ width: "400px" }}
        value={term}
        placeholder={"¿Qué está buscando?..."}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchingBar;
