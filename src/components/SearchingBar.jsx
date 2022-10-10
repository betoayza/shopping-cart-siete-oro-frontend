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
          } else {
            setProducts([]);
          }
          //else {
          //   setModal(false);
          //   setModalSearchProducts(false);
          // }
        })
        .catch((error) => error);
    };
    if (term !== "") getProducts();
  }, [term]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
    if (e.target.value === "") {
      setProducts(null);
      setModal(false);
      setModalSearchProducts(false);
    }
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
    </div>
  );
};

export default SearchingBar;
