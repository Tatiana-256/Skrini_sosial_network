import React from "react";
import classes from "./Post.module.css";

const Post = props => {
    console.log(props.like)
    return (

        <div>
            <div className={classes.items}>
                <img src={props.image}></img>
                {props.m}
            </div>
            <div>
                {props.like ?
                    <button className={classes.btnno}
                            onClick={() => {
                                props.deleteLike(props.postId)
                            }}>
                        like</button> :
                    <button className={classes.btn}
                            onClick={() => {
                                props.setLike(props.postId)
                            }}>
                        like</button>}

                {props.likecount}
            </div>
        </div>
    );
};

export default Post;
