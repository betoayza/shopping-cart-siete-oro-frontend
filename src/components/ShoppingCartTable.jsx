import axios from "axios";
import React, { useState, useEffect } from "react";
import { ShoppingCartTableRow } from "./ShoppingCartTableRow";
import { PaymentForm } from "./PaymentForm";
import { Modal } from "./Modal";
// import moment from "moment";

export const ShoppingCartTable = ({
  shoppingCart,
  setShoppingCart,
  userCode,
}) => {
  if (!shoppingCart.products.length) setShoppingCart(null);

  const [toBuy, setToBuy] = useState(1);
  const [itemIndex, setItemIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalPaymentForm, setModalPaymentForm] = useState(false);

  // useEffect(() => {
  //   console.log("dsa: ", toBuy, itemIndex);
  //   const updateToBuy = async (toBuy, itemIndex) => {
  //     const options = {
  //       url: "/api/user/shopping-cart/update/toBuy",
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Accept: "application/json",
  //         timeout: 3000,
  //       },
  //       data: { userCode, toBuy, itemIndex },
  //     };

  //     await axios
  //       .request(options)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data) {
  //           alert("Cantidad actualizada!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   updateToBuy(toBuy, itemIndex);
  // }, [toBuy, itemIndex]);

  const updateToBuy = async (toBuy, itemIndex) => {
    //console.log("fasdasd: ", toBuy, itemIndex);
    setToBuy(toBuy);
    setItemIndex(itemIndex);

    const options = {
      url: "/api/user/shopping-cart/update/toBuy",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { userCode, toBuy, itemIndex },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res);
        // if (res.data) {
        //   alert("Cantidad actualizada!");
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePurchase = () => {
    // const date = moment(new Date()).format("DD/MM/YYYY");
    // const amount = shoppingCart.reduce(() => a + b);
    // const purchase = {
    //   code: Date.now(),
    //   userCode,
    //   products: shoppingCart,
    //   amount,
    //   date,
    //   status: "Activo",
    // };
    // const options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "*",
    //     Accept: "application/json",
    //     timeout: 3000,
    //   },
    //   data: {},
    // };
    // await axios
    //   .post(`/api/user/shopping-cart/delete`, options)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data) {
    //       setShoppingCart(res.data.products);
    //       alert("Eliminacion exitosa");
    //     } else {
    //       alert("No se encontró producto");
    //     }
    //   })
    //   .catch((error) => error);
    setModal(true);
    setModalPaymentForm(true);
  };

  const removeItem = async (prodCode, userCode, index) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { prodCode, userCode, index },
    };

    await axios
      .delete(`/api/user/shopping-cart/delete`, options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setShoppingCart(res.data);
          alert("Eliminacion exitosa");
        } else {
          alert("No se encontró producto");
        }
      })
      .catch((error) => error);
  };

  const removeAllItems = async (e) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { userCode },
    };
    await axios
      .delete("/api/user/shopping-cart/delete/all", options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setShoppingCart(null);
          alert("Items borrados!");
        } else {
          alert("Carrito inexistente :(");
        }
      })
      .catch((error) => error);
  };

  return modal ? (
    <>
      <Modal>
        {modalPaymentForm && (
          <PaymentForm
            setModal={setModal}
            setModalPaymentForm={setModalPaymentForm}
          />
        )}
      </Modal>
    </>
  ) : (
    <div>
      {console.log("lista: ", shoppingCart.products)}

      <div className={"responsible-table"} id={"shopping-cart-div"}>
        <table className={"table table-hover"}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">A llevar</th>
              <th scope="col">Imagen</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart &&
              shoppingCart.products.map((product, index) => {
                console.log("asdsd", index);
                return (
                  <ShoppingCartTableRow
                    key={index}
                    product={product}
                    userCode={userCode}
                    removeItem={removeItem}
                    updateToBuy={updateToBuy}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>

        <button className="btn btn-danger" onClick={removeAllItems}>
          Vaciar
        </button>
        <button className="btn btn-success" onClick={handlePurchase}>
          Comprar
        </button>
      </div>
    </div>
  );
};
