import axios from "axios";
import React, { useState, useEffect } from "react";

export const SelectProductsCodes = ({ setProductCode, setModal, setModalSearchProduct }) => {
  const [selected, setSelected] = useState("Seleccione");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      const options = {
        url: "/api/products/all",
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
          if (res.data) {
            setProducts(res.data);
          } else return;
        })
        .catch((error) => error);
    };
    getAllProducts();
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setProductCode(e.target.value);
    setModal(true);
    setModalSearchProduct(true);
  };

  return (
    <div>      
      <label>
        Buscar: {" "}
      <select value={selected} onChange={handleChange}>
        <option value="">---</option>
        {products &&
          products.map((product) => (
            <option key={product._id} value={product.code}>
              {product.code}
            </option>
          ))}
      </select>
      </label>
    </div>
  );
};
