import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal } from "./Modal";
import { ProductCommentStyle } from "./ProductCommentStyle";

export const ProductCard = ({
  index,
  product,
  userCode,
  showButton = true,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const refComment = useRef("");

  //check if item is already added to cart
  useEffect(() => {
    const isItemAdded = async () => {
      let prodCode = product.code;
      const options = {
        url: "/api/user/shopping-cart/check-item-added",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/json",
        },
        params: { userCode, prodCode },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setIsAdded(true);
          } else {
            setIsAdded(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    isItemAdded();
  }, []);

  const addToCart = async () => {
    let productCode = product.code;
    const options = {
      url: "/api/user/shopping-cart/add",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { productCode, userCode },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // alert("Agregado ;)");
          setIsAdded(true);
        } else {
          setIsAdded(false);
        }
      })
      .catch((error) => error);
  }; //working

  const removeFromCart = async () => {
    let prodCode = product.code;
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
          // alert("Quitado del carrito :(");
          setIsAdded(false);
        } else setIsAdded(true);
      })
      .catch((error) => error);
  };

  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const handleComments = () => {
    setIsCommentClicked(true);
  };

  const handleClose = () => {
    setIsCommentClicked(false);
  };

  const handlePostComment = async () => {
    console.log(refComment.current.value);
    let comment = refComment.current.value;
    let productCode = product.code;
    const options = {
      url: "/api/user/comment/add",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      data: { userCode, comment, productCode },
      timeout: 3000,
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert("Comentario subido ;)");
        } else {
          alert("Ocurrio un error :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return isCommentClicked ? (
    <Modal>
      <div
        className={
          "form-control d-grid align-items-center border border-success border-5 h-100"
        }
        style={{ width: "500px", maxHeight: "80vh" }}
      >
        <textarea
          rows={5}
          cols={10}
          maxLength={"500"}
          placeholder={"Comentar..."}
          style={{ borderRadius: "0.5rem" }}
          ref={refComment}
          required
        />
        <div className={"mb-3"}>
          <button
            type={"button"}
            className={"btn btn-primary"}
            onClick={handlePostComment}
          >
            Comentar
          </button>
        </div>

        <div
          className={"overflow-scroll"}
          style={{ width: "100%", height: "150px" }}
        >
          {product.comments.length &&
            product.comments.map((comment, index) => {
              return <ProductCommentStyle key={index} comment={comment} />;
            })}
        </div>
        <div>
          <button
            type={"button"}
            className={"btn btn-danger w-20"}
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  ) : (
    <div className={"card p-2 m-1"} style={{ width: "200px", height: "auto" }}>
      <div>
        <img
          src={"data:image/png;base64," + toBase64(product.image.data)}
          className="card-img-top"
          alt="Imagen"
        />
        <h5 className="card-title">{product.name}</h5>
      </div>
      <div className={"card-body"}>
        <span className="card-text align-middle">{product.description}</span>
        <h3>Stock: {product.stock}</h3>
        <h3>${product.price}</h3>
        {showButton &&
          (isAdded ? (
            <button className={"btn btn-danger"} onClick={removeFromCart}>
              <i
                className="bi-dash-lg"
                style={{ color: "white", fontSize: "20px" }}
              ></i>
            </button>
          ) : (
            <button className={"btn btn-success"} onClick={addToCart}>
              <i
                className="bi-plus-lg"
                style={{ color: "white", fontSize: "20px" }}
              ></i>
            </button>
          ))}
        <button className={"btn btn-secondary"} onClick={handleComments}>
          <i
            className="bi-chat-dots-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      </div>
    </div>
  );
};
