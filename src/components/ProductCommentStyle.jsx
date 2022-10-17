import React from "react";

//comment prop is {username: 'comment'}
export const ProductCommentStyle = ({ comment }) => {
  return (
    <div className={"form-control mt-2"}>
      <p className={"fw-bold"}>{Object.keys(comment)}</p>
      <p className={"fs-6 fw-lighter fst-italic"}>"{Object.values(comment)}"</p>
    </div>
  );
};
