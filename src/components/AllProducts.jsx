import React, { useState, useEffect } from "react";
import axios from "axios";

const AllProducts = () => {
  const [productsTable, setProductsTable] = useState([]); //static data

  //function to search all products
  const getAllProducts = async () => {
    const url = "/all-products";
    await axios
      .get(url)
      .then((res) => {
        setProductsTable(res.data);
        console.log(setProductsTable);
      })
      .catch((error) => {
        console.log("El error es: ", error);
      });
  };

  //const addToCart =

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="responsible-table">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Quedan</th>
            <th scope="col">Agregar</th>
          </tr>
        </thead>
        <tbody>
          {productsTable &&
            productsTable.forEach((prod) => {
              <tr>
                <td>prod.name</td>
                <td>prod.description</td>
                <td>prod.price</td>
                <td>prod.stock</td>
                <td>
                  <button /*onClick=addToCart*/>Agregar</button>
                </td>
              </tr>;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
