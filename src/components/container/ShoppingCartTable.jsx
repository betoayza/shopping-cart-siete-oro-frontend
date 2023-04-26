import axios from "axios";
import React, { useState, useEffect } from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";
import { useNavigate } from "react-router-dom";
import { helpAxios } from "../../helpers/helpAxios";
import { Modal } from "../pure/Modal";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  const [toBuy, setToBuy] = useState(1);
  const [itemIndex, setItemIndex] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isModalActivated, setIsModalActivated] = useState(false);

  let navigate = useNavigate();

  // useEffect(() => {
  //   const updateItemToBuyCounter = async (toBuy, itemIndex) => {
  //     const shoppingCartUpdated = await helpAxios().changeItemToBuyCounter(
  //       userCode,
  //       toBuy,
  //       itemIndex
  //     );

  //     if (shoppingCartUpdated instanceof Error) setIsError(true);
  //     else setShoppingCart(shoppingCartUpdated);
  //   };

  //   updateItemToBuyCounter(toBuy, itemIndex);
  // }, [toBuy, itemIndex]);

  const handleClose = () => {
    setIsModalActivated(false);
  };

  const handleUpdateToBuy = (quantity, index) => {
    setToBuy(quantity);
    setItemIndex(index);
  };

  const handlePurchase = async () => {
    //get shopping cart refreshed
    const getShoppingCart = async () => {
      const options = {
        url: `${import.meta.env.VITE_API}/user/shopping-cart`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers": "*",
        //   Accept: "application/json",
        // },
        timeout: 3000,
        params: { userCode },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            const cart = res.data.products;

            let items = cart.map((product) => ({
              ...product,
              ["image"]: "",
            }));

            //alert(JSON.stringify(items));

            if (
              items.filter((item) => {
                return item.toBuy > item.stock;
              }).length
            ) {
              alert("Cantidad incorrecta :(");
            } else {
              const doPayment = async () => {
                const options = {
                  url: `${import.meta.env.VITE_API}/payment`,
                  method: "POST",
                  // headers: {
                  //   "Content-Type": "application/json",
                  //   "Access-Control-Allow-Origin": "*",
                  //   "Access-Control-Allow-Headers": "*",
                  //   Accept: "application/json",
                  // },
                  timeout: 3000,
                  data: { items, userCode },
                };

                await axios
                  .request(options)
                  .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                      window.location.href = res.data.init_point;
                    } else {
                      navigate(res.data.back_urls.failure);
                    }
                  })
                  .catch((error) => error);
              };
              doPayment();
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getShoppingCart();
  };

  const removeItem = async (prodCode, userCode, index) => {
    const shoppingCartUpdated = await helpAxios().removeItem(prodCode, userCode, index)
        if (shoppingCartUpdated instanceof Error) setIsError(true)
        else setShoppingCart(shoppingCartUpdated);      
  };

  const removeAllItems = async () => {
    const shoppingCartEmpty = await helpAxios().cleanShoppingCart(userCode);
    if (shoppingCartEmpty instanceof Error) setIsError(true);
    else {
      setIsModalActivated(true)
      setShoppingCart(shoppingCartEmpty);
    }
  };

  return isError ? (
    <h2>Error en la conexión :(</h2>
  ) : isModalActivated ? (
    <Modal>
      <h3>Carrito limpio ;)</h3>
      <button className="btn btn-danger" onClick={handleClose}>
        Close
      </button>
    </Modal>
  ) : (
    <div className={"w-100 d-flex justify-content-center"}>
      <div
        className={"table-responsive overflow-auto pb-3"}
        style={{ width: "75%", maxHeight: "500px" }}
      >
        <table className={"table table-hover table-sm"}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio /u</th>
              <th scope="col">A llevar</th>
              <th scope="col">Max</th>
              <th scope="col">Imagen</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.products.map((product, index) => {
              return (
                <ShoppingCartTableRow
                  key={index}
                  product={product}
                  userCode={userCode}
                  removeItem={removeItem}
                  index={index}
                  handleUpdateToBuy={handleUpdateToBuy}
                />
              );
            })}
          </tbody>
        </table>

        <button className="btn btn-dark" onClick={removeAllItems}>
          <i
            className="bi-cart-x-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          <i
            className="bi-credit-card"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </div>
    </div>
  );
};
