import "./Loader.css";

import React from "react";

export const Loader = () => {
  return (
    <div id="loading-parent-div">
    <div className="lds-circle">
      <div></div>      
    </div>
  </div>
  );
};