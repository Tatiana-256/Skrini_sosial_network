import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from "../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(props => {
    let setLike = (postId) => {
        props.setLike(postId)
    }
    let deleteLike = (postId) => {
        props.deleteLike(postId)
    }
    let onePost = props.posts.map(post => (
        <Post postId={post.id} postText={post.message}
              setLike={setLike}
              deleteLike={deleteLike}
              like={post.like}
              image={post.image}/>
    ));

    let addNewPost = values => {
        props.addPost(values.newPostText);
    };

    return (
        <div>
            <b>My post</b>
            <div>
                <PostReduxForm onSubmit={addNewPost}/>
            </div>
            <div className={classes.posts}>{onePost}</div>
        </div>
    );
});

const maxLength10 = maxLengthCreator(400);

const MyPostsForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                placeholder={"Put your post"}
                component={Textarea}
                name="newPostText"
                validate={[required, maxLength10]}
            />
            <div>
                <button>Add new post</button>
            </div>
        </form>
    );
};

const PostReduxForm = reduxForm({
    form: "ProfileAddNewPostForm"
})(MyPostsForm);

export default MyPosts;
