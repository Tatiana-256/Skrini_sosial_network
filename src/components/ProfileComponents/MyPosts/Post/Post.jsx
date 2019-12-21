import React from "react";
import classes from "./Post.module.css";
import { inherits } from "util";

const Post = props => {
  return (
    <div>
      <div className={classes.items}>
        <img src={props.image}></img>
        {props.m}
      </div>
      <div>
        <span>likes </span>
        {props.likecount}
      </div>
    </div>
  );
};

export default Post;

// lass Post extends React.Component {
//   render(props) {
//     return (
