import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator
} from "../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    posts: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updateNewPostTextActionCreator: text => {
      dispatch(updateNewPostTextActionCreator(text));
    }
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
