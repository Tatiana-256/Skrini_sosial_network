import React from "react";
import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    id: string | null,
    name: string | null
}


const DialogItem = (props: PropsType) => {
    let addres = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog + " " + classes.active}>
            <NavLink to={addres}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;
