import React, { useState } from "react";
import axios from "axios";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchingBar = ({ userCode }) => {
  const [products, setProducts] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "/api/products/get",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      params: { name },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setProducts(res.data);
        } else {
          alert("Sin coincidencias :(");
        }
      })
      .catch((error) => error);
    //navigate("/products-founded", { state: { data } });
  };

  //Only controls typing
  const handleChange = (e) => {
    setName(e.target.value);
    console.log("Tipeado: ", e.target.value);
  };

  return (
    <>
      <div className="text-center searching-bar-div">
        <h1>Panadería Siete de Oro</h1>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row ">
              <div className="col-md-9">
                <input
                  className="form-control"
                  name="producto"
                  value={name}
                  placeholder="¿Qué está buscando?..."
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <br />
      </div>

      {products && (
        <ProductsTableUsers
          products={products}
          setProducts={setProducts}
          userCode={userCode}
        />
      )}
    </>
  );
};

export default SearchingBar;
