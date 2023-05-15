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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const result = await helpAxios().getProductsAdmin(term);

      if (result instanceof Error) setIsError(true);
      else {
        setProducts(result);
        setModal(true);
        setModalSearchProduct(true);
      }
    };

    if (term != "") getProduct();
    else {
      setProducts(null);
      setModal(false);
      setModalSearchProduct(false);
    }
  }, [term]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return isError ? (
    <h2 className="text-center">Error en la conexión</h2>
  ) : (
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
