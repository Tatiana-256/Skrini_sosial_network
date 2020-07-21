import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth?: boolean,
    login?: string,
    logout?: ()=> void
}

const Header = (props: PropsType) => {
    return (
        <header className={classes.header}>
            <div>
                <div className={classes.social_name}>Skrini</div>
                <div className={classes.social_log_in}>
                    {props.isAuth ? (
                        <div>
                            {" "}
                            {props.login}
                            <button className={classes.btn} onClick={props.logout}>Log out</button>
                        </div>
                    ) : (
                        <NavLink to={"/login"}>Log in</NavLink>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;
