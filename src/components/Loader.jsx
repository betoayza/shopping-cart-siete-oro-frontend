import React from "react";
import { Modal } from "../../../netflix-clone/src/components/pure/Modal";

import "./Loader.css";

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
