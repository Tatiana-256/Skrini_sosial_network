import React from "react";
import loadingPage from "../../../assets/loading.svg";
import classes from './loader.module.css'

let Preloader = props => {
  return (
    <div className={classes.loader}>
      <img src={loadingPage} />
    </div>
  );
};

export default Preloader;
