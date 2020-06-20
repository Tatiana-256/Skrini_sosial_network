import React from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.items}>
        <NavLink to="/Profile" activeClassName={classes.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={classes.items}>
        <NavLink to="/Dialogs" activeClassName={classes.activeLink}>
          Message
        </NavLink>
      </div>
      <div className={classes.items}>
        <NavLink to="/News" activeClassName={classes.activeLink}>
          News
        </NavLink>
      </div>
      <div className={classes.items}>
        <NavLink to="/Music" activeClassName={classes.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={classes.items}>
        <NavLink to="/Settings" activeClassName={classes.activeLink}>
          Settings
        </NavLink>
      </div>
      <div className={classes.items}>
        <NavLink to="/Users" activeClassName={classes.activeLink}>
          Users
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
