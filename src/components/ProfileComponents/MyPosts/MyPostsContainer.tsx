import React from "react";
import {addPostActionCreator, deleteLike, setLike} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {postType, userType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";



type mapStateToPropsType = {
    posts: postType,
    newPostText: string


}
type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    setLike: (postId: string) => void
    deleteLike:  (postId: string) => void
}


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    };
};

const mapDispatchToProps =( dispatch) => {
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

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
