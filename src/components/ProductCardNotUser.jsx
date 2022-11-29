import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal } from "./Modal";
import { ProductCommentStyle } from "./ProductCommentStyle";
import { API } from "../api/api";

export const ProductCardNotUser = ({ product }) => {
  const [isCommentsClicked, setIsCommentsClicked] = useState(false);
  const [comments, setComments] = useState(product.comments);

  useEffect(() => {
    const getProductComments = async () => {
      let productCode = product.code;
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
    getProductComments();
  }, [comments]);

  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const handleComments = () => {
    setIsCommentsClicked(true);
  };

  const handleClose = () => {
    setIsCommentsClicked(false);
  };

  return isCommentsClicked && comments ? (
    <Modal>
      <div
        className={         
          "vw-100 form-control container mx-auto border border-success border-5 overflow-auto"
        }
        style={{ borderRadius: "1rem", maxHeight: "400px" }}
      >
        {comments.length &&
        comments.filter((comment) => comment.status === "Active").length ? (
          <div className={"mt-2"} style={{ maxHeight: "150px" }}>
            <h3>Comentarios</h3>
            <div
              className={"overflow-auto w-100"}
              style={{ width: "100%", height: "200px" }}
            >              
              {comments.map((comment, index) => {
                console.log(comment);
                return (
                  comment.status === "Active" && (
                    <ProductCommentStyle
                      key={index}
                      index={index}
                      comment={comment}
                      setComments={setComments}
                      productCode={product.code}
                    />
                  )
                );
              })}
            </div>
            <div className={"mt-2"}>
              <button
                type={"button"}
                className={"btn btn-danger w-20"}
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3>No hay comentarios</h3>
            <div className={"mt-2"}>
              <button
                type={"button"}
                className={"btn btn-danger w-20"}
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
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
