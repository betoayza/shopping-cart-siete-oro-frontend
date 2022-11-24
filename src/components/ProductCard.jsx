import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { ProductCommentStyle } from "./ProductCommentStyle";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API } from "../api/api";

export const ProductCard = ({
  index,
  product,
  userCode,
  showButton = true,
  username,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [comments, setComments] = useState(product.comments);
  // const [commentsCounter, setCommentsCounter] = useState(0);
  const refComment = useRef("");

  //check if item is already added to cart
  useEffect(() => {
    const isItemAdded = async () => {
      let prodCode = product.code;
      const options = {
        url: `${API}/user/shopping-cart/check-item-added`,
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
      url: `${API}/user/shopping-cart/add`,
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
      .delete(`${API}/user/shopping-cart/delete`, options)
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

  const handlePostComment = async (e) => {
    e.preventDefault();
    console.log(refComment.current.value);
    let comment = refComment.current.value;
    console.log(comment.length);
    let productCode = product.code;
    const options = {
      url: `${API}/user/comment/add`,
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
          const getProductComments = async (productCode) => {
            const options = {
              url: `${API}/product/code`,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                Accept: "application/json",
              },
              params: { productCode },
              timeout: 3000,
            };

            await axios
              .request(options)
              .then((res) => {
                console.log(res.data);
                if (res.data) setComments(res.data.comments);
              })
              .catch((error) => {
                console.error(error);
              });
          };
          getProductComments(productCode);
        } else {
          alert("Ocurrio un error :(");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return isCommentClicked && comments ? (
    <Modal>
      <div
        className={
          "vw-100 h-auto form-control container mx-auto border border-success border-5 overflow-auto"
        }
        style={{ borderRadius: "1rem" }}
      >
        <div
          className={"row row-cols-auto"}          
        >
          <div className={"col col-md-auto mx-auto w-100"}>
            <form className={"w-100"} onSubmit={handlePostComment}>
              <textarea
                rows={5}
                cols={10}
                maxLength={500}
                placeholder={"Comentar..."}
                style={{
                  borderRadius: "0.5rem",
                  width: "100%",
                  color: "green",
                }}
                ref={refComment}
                required
              />

              <div className={"mt-2"}>
                <button type={"submit"} className={"btn btn-primary"}>
                  Comentar
                </button>
                <button
                  type={"button"}
                  className={"btn btn-danger w-20"}
                  onClick={handleClose}
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
        {comments.length &&
        comments.filter((comment) => comment.status === "Active").length ? (
          <div className={"mt-2"} style={{ maxHeight: "150px" }}>
            <div
              className={"overflow-auto"}            
              style={{ width: "100%", height: "200px" }}
            >
              {comments.map((comment, index) => {
                console.log(comment);
                return (
                  comment.status === "Active" && (
                    <div className={"row w-100"}>
                      <ProductCommentStyle
                        key={index}
                        index={index}
                        comment={comment}
                        setComments={setComments}
                        productCode={product.code}
                        username={username}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ) : null}
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
        <h5 className="card-title">
          <span style={{ fontWeight: "bold" }}>{product.name}</span>
        </h5>
      </div>
      <div className={"card-body"}>
        <span className="card-text align-middle">{product.description}</span>
        <h5>
          Quedan: <span style={{ color: "orange" }}>{product.stock}</span>
        </h5>
        <h3 style={{ color: "green" }}>${product.price}</h3>
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
