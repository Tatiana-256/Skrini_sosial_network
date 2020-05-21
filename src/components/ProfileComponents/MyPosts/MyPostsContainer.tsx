import React from "react";
import {ActionCreatorType, addPostActionCreator, deleteLike, setLike} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {contactsType, postType, userType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";
import {ActionTypes} from "redux-form";
import {Dispatch} from "redux";


type mapStateToPropsType = {
    posts: Array<postType>,
    newPostText: string


}
type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    setLike: (postId: string) => void
    deleteLike: (postId: string) => void
}

type ownProps ={}

type DispatchType = Dispatch<ActionCreatorType>

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    };
};

const mapDispatchToProps = (dispatch: DispatchType): mapDispatchToPropsType => {
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

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, ownProps, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
