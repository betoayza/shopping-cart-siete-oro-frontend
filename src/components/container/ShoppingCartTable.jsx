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
  const [itemCounter, setItemCounter] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [isModalActivated, setIsModalActivated] = useState(false);
  // let navigate = useNavigate();

  const updateItemCounter = async (userCode, counter, index) => {
    try {
      // Each time user updateds item counter, give back shopping cart updated
      const shoppingCartUpdated = await helpAxios().updateItemCounter(
        userCode,
        counter,
        index
      );

      if (
        Object.prototype.toString.call(shoppingCartUpdated) ===
          "[object Error]" ||
        shoppingCartUpdated.name === "AxiosError"
      )
        throw new Error();

      setShoppingCart(shoppingCartUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (itemCounter !== null && itemIndex !== null)
      updateItemCounter(userCode, itemCounter, itemIndex);
  }, [itemCounter, itemIndex]);

  const handleClose = () => {
    setIsModalActivated(false);
  };

  const handleUpdateItemCounter = (itemCounter, index) => {
    setItemCounter(itemCounter);
    setItemIndex(index);
  };

  const handlePurchase = async () => {
    if (shoppingCart) {
      const cart = shoppingCart.products;

      const items = cart.map((product) => ({
        ...product,
        ["image"]: "",
      }));

      if (
        items.filter((item) => {
          return item.toBuy > item.stock;
        }).length
      ) {
        alert("Cantidad incorrecta :(");
      } else await helpAxios().doPayment(items, userCode);
    }
  };

  const removeItem = async (prodCode, userCode, index) => {
    const shoppingCartUpdated = await helpAxios().removeItem(
      prodCode,
      userCode,
      index
    );

    if (shoppingCartUpdated instanceof Error) setIsError(true);
    else setShoppingCart(shoppingCartUpdated);
  }; // falta modificar backend y registro producto por isInCart

  const removeAllItems = async () => {
    try {
      const shoppingCartEmpty = await helpAxios().cleanShoppingCart(userCode);

      if (
        Object.prototype.toString.call(shoppingCartEmpty) ===
          "[object Error]" ||
        shoppingCartEmpty.name === "AxiosError"
      )
        throw new Error();

      setIsModalActivated(true);
      setShoppingCart(shoppingCartEmpty);
    } catch (error) {
      console.error(error);
    }

    // if (shoppingCartEmpty instanceof Error) console.error(shoppingCartEmpty);
  };

  return isModalActivated ? (
    <Modal>
      <h3>Carrito limpio ;)</h3>
      <button className="btn btn-danger" onClick={handleClose}>
        Close
      </button>
    </Modal>
  ) : (
    shoppingCart && (
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
                    key={product.code}
                    product={product}
                    userCode={userCode}
                    removeItem={removeItem}
                    itemIndex={index}
                    handleUpdateItemCounter={handleUpdateItemCounter}
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
    )
  );
};
