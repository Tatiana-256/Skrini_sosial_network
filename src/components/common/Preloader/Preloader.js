import React from "react";
import loadingPage from "../../../assets/loading.svg";

let Preloader = props => {
  return (
    <div>
      <img src={loadingPage} />
    </div>
  );
};

export default Preloader;
