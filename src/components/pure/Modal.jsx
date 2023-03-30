import React from "react";
import "../../styles/modal.css";

export const Modal = ({ children }) => {
  return (
    <div className={"modal is-open"}>
      <div className={"modal-div"}>{children}</div>
    </div>
  );
};
