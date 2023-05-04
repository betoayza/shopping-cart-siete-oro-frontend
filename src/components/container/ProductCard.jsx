import React, { useState, useEffect, useRef } from "react";
import { Modal } from "../pure/Modal";
import { ProductCommentStyle } from "../pure/ProductCommentStyle";
import { helpAxios } from "../../helpers/helpAxios";

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
  const refComment = useRef("");

  //check if item is already added to cart
  useEffect(() => {
    const checkIsIteminCart = async () => {
      const prodCode = product.code;
      const result = await helpAxios().checkIsItemInCart(userCode, prodCode);

      if (!(result instanceof Error)) setIsAdded(true);
    };

    checkIsIteminCart();
  }, []);

  const addToCart = async () => {
    const productCode = product.code;
    const result = await helpAxios().addItemToCart(productCode, userCode);

    if (!(result instanceof Error)) setIsAdded(true);
  };

  const removeItemFromCart = async () => {
    const prodCode = product.code;
    const result = await helpAxios().removeItemFromCart(
      prodCode,
      userCode,
      index
    );

    if (!(result instanceof Error)) setIsAdded(false);
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
    console.log(refComment.current.value); // CHEQUEAR ESTO

    const comment = refComment.current.value;
    console.log(comment.length);

    const productCode = product.code;
    const isCommentAdded = await helpAxios().postItemComment(
      userCode,
      comment,
      productCode
    );

    if (isCommentAdded) {
      const getProductComments = async (productCode) => {
        const commentsList = await helpAxios().getProductComments(productCode);
        
        if (!(commentsList instanceof Error)) setComments(commentsList);
      };

      getProductComments(productCode);
    }
  };

  return isCommentClicked && comments ? (
    <Modal>
      <div
        className={
          "vw-100 h-auto form-control container mx-auto border border-success border-5 overflow-auto"
        }
        style={{ borderRadius: "1rem" }}
      >
        <h3>Comentarios</h3>
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
          style={{ maxHeight: "200px" }}
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
            <button className={"btn btn-danger"} onClick={removeItemFromCart}>
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
