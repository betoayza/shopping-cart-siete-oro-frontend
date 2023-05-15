import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "../pure/Modal";
import { ProductCommentStyle } from "../pure/ProductCommentStyle";

export const ProductCardOrderItem = ({
  index,
  product,
  userCode,
  showButton = true,
  username,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [comments, setComments] = useState(product.comments);
  const refComment = useRef("");

  //check if item is already added to cart
  useEffect(() => {
    const isItemAdded = async () => {
      const prodCode = product.code;
      const options = {
        url: `${import.meta.env.VITE_API}/user/shopping-cart/check-item-added`,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers": "*",
        //   Accept: "application/json",
        // },
        params: { userCode, prodCode },
        timeout: 3000,
      };

      await axios
        .request(options)
        .then((res) => {
          if (res.data) {
            setIsAdded(true);
          } else {
            setIsAdded(false);
          }
        })
        .catch((error) => error);
    };
    isItemAdded();
  }, []);

  // const toBase64 = (arr) => {
  //   //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   return btoa(
  //     arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  //   );
  // };

  const handleComments = () => {
    setIsCommentClicked(true);
  };

  const handleClose = () => {
    setIsCommentClicked(false);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();

    console.log(refComment.current.value);
    const comment = refComment.current.value;
    const productCode = product.code;

    const options = {
      url: `${import.meta.env.VITE_API}/user/comment/add`,
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Headers": "*",
      //   Accept: "application/json",
      // },
      timeout: 3000,
      data: { userCode, comment, productCode },
    };

    await axios
      .request(options)
      .then((res) => {
        console.log(res);

        if (res.data) {
          const getProductComments = async (productCode) => {
            const options = {
              url: `${import.meta.env.VITE_API}/product/code`,
              // headers: {
              //   "Content-Type": "application/json",
              //   "Access-Control-Allow-Origin": "*",
              //   "Access-Control-Allow-Headers": "*",
              //   Accept: "application/json",
              // },
              timeout: 3000,
              params: { productCode },
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
      .catch((error) => error);
  };

  return isCommentClicked && comments ? (
    <Modal>
      <div
        className={
          "vw-100 h-auto form-control container mx-auto border border-success border-5 overflow-auto"
        }
        style={{ borderRadius: "1rem" }}
      >
        <h4>Comentarios</h4>
        <div className={"row row-cols-auto"}>
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
              className={"overflow-auto w-100"}
              style={{ width: "100%", height: "200px" }}
            >
              {comments.map((comment, index) => {
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
          src={"data:image/png;base64," + product.image}
          className="card-img-top"
          alt="Imagen"
          style={{ maxHeight: "200px" }}
        />
        <h5 className="card-title">{product.name}</h5>
      </div>
      <div className={"card-body"}>
        <span className="card-text align-middle">{product.description}</span>
        <h3>
          <span style={{ color: "green" }}>${product.price}</span>
          <span style={{ color: "#bc2d56" }}> x {product.quantity}</span>
        </h3>
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
