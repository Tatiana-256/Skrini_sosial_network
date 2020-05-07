import React from "react";
import {addPostActionCreator, deleteLike, setLike} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        posts: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPost: newPostText => {
            dispatch(addPostActionCreator(newPostText));
        },
        setLike: (postId) => {
            dispatch(setLike(postId))
        },
        deleteLike: (postId) => {
            dispatch(deleteLike(postId))
        }
    };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
