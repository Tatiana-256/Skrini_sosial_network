import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
  let onePost = props.posts.map(post => (
    <Post m={post.message} likecount={post.likecount} image={post.image} />
  ));

  let newPostElement = React.createRef();

  let onaAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostTextActionCreator(text);
  };

  return (
    <div>
      my post
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onaAddPost}>Add new post</button>
        </div>
      </div>
      <div className={classes.posts}>{onePost}</div>
    </div>
  );
};

export default MyPosts;
