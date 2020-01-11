import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

// const MyPosts = props => {
//   const onSubmit = FormData => {};
//   return <PostReduxForm onSubmit={onSubmit} />;
// };

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

  let addNewPost = values => {
    alert(values.post);
  };

  return (
    <div>
      my post
      <div>
        <PostReduxForm onSubmit={addNewPost} />
        <div>
          <button onClick={onaAddPost}>Add new post</button>
        </div>
      </div>
      <div className={classes.posts}>{onePost}</div>
    </div>
  );
};

const MyPostsForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        // onChange={onPostChange}
        // ref={newPostElement}
        // value={props.newPostText}
        placeholder={"Put your post"}
        component={"textarea"}
        name={"post"}
      />
    </form>
  );
};

const PostReduxForm = reduxForm({
  form: "post"
})(MyPostsForm);

export default MyPosts;
