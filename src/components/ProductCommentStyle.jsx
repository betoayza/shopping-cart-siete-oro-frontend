import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

//comment prop is {username: 'comment'}
export const ProductCommentStyle = ({
  index,
  comment,
  setComments,
  productCode,
  username = "",
}) => {
  const handleDeleteComment = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        timeout: 3000,
      },
      data: { index, productCode },
    };

    await axios
      .delete(`/api/user/comment/delete`, options)
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert("Comentario borrado ;)");

          const getProductComments = async () => {
            const options = {
              url: "/api/product/code",
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
        }
      })
      .catch((error) => error);
  };

  return (
    <div className={"form-control mt-2"}>
      <p className={"fw-bold"}>@{comment.username}</p>
      <p className={"fs-6 fw-lighter fst-italic text-break"}>
        "{comment.comment}"
      </p>
      {comment.username === username && (
        <button
          type="button"
          className={"btn btn-danger"}
          onClick={handleDeleteComment}
        >
          <i
            className="bi-trash-fill"
            style={{ color: "white", fontSize: "20px" }}
          ></i>
        </button>
      )}
    </div>
  );
};
