import React, { useEffect, useState } from "react";
import { helpAxios } from "../../helpers/helpAxios";
import { ProductsTable } from "./ProductsTable";

export const ProductsSearchingBar = ({
  term,
  setTerm,
  setModal,
  setModalSearchProduct,
  isModalStyle = false,
}) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const result = await helpAxios().getProductsAdmin(term);
      console.log("ASDASDASD", result);

      if (result) {
        setProducts(result);
        setModal(true);
        setModalSearchProduct(true);
      }
    };

    if (term !== "") getProduct();
    else {
      setProducts(null);
      setModal(false);
      setModalSearchProduct(false);
    }
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  return (
    <div className={"searching-bar"}>
      <div className={"row row-cols-1"} style={{ width: "50%" }}>
        <input
          type="text"
          value={term}
          placeholder={"Buscar..."}
          onChange={handleChange}
          className={"form-control col col-md-auto"}
        />
      </div>

      {products && term !== "" && (
        <div className={"vw-100 col col-md-auto"}>
          <ProductsTable
            products={products}
            setProducts={setProducts}
            addAndSearch={false}
            isModalStyle={isModalStyle}
          />
        </div>
      )}
    </div>
  );
};
