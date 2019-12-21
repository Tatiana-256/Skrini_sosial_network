import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    // <header>
    <header className={classes.header}>
      {/* <img src="https://logosrated.net/wp-content/uploads/parser/A-and-A-Logo-1.png"></img> */}
      {/* <img src="https://www.onlinelogomaker24.com/images/crearlogogratis_1024x1024_01.png"></img> */}
      <div>
        <div className={classes.social_log_in}>Log in</div>
        <div className={classes.social_name}>Skrini</div>
      </div>
    </header>
    //   <div className={classes.logIn}>Log in</div>
    // </header>
  );
};

export default Header;
