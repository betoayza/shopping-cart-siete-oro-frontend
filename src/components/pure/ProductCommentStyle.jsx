import React from "react";
import { helpAxios } from "../../helpers/helpAxios";

//comment prop is {username: 'comment'}
export const ProductCommentStyle = ({
  index,
  comment,
  setComments,
  productCode,
  username = "",
}) => {
  const handleDeleteComment = async () => {
    try {
      const isDeleted = await helpAxios().removeItemComment(index, productCode);

      if (
        Object.prototype.toString.call(isDeleted) === "[object Error]" ||
        isDeleted.name === "AxiosError"
      )
        throw new Error();

      const productComments = await helpAxios().getProductComments(productCode);

      if (
        Object.prototype.toString.call(productComments) ===
          "[object Error]" ||
        productComments.name === "AxiosError"
      )
        throw new Error();

      setComments(productComments);
    } catch (error) {
      console.error(error);
    }
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
