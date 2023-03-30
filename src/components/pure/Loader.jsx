import React from "react";
import { Modal } from "../../components/pure/Modal";
import "../../styles/loader.css";

export const Loader = () => {
  return (
    <Modal>
      <div id="loading-parent-div">
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    </Modal>
  );
};
