import React from "react";
import classes from "./Post.module.css";


type PropsType = {
    image: string,
    like: boolean,
    likecount: number,
    postId: string,
    postText: string,
    deleteLike: (id: string) => void,
    setLike: (id: string) => void
}

const Post = (props: PropsType) => {
    return (

        <div>
            <div className={classes.items}>
                <img src={props.image}/>
                {props.postText}
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
