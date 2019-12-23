import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header className={classes.header}>
      <div>
        <div className={classes.social_log_in}>
          {props.isAuth ? props.login : <NavLink to={"/login"}>Log in</NavLink>}
        </div>
        <div className={classes.social_name}>Skrini</div>
      </div>
    </header>
  );
};

export default Header;
