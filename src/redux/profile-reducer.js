import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  postData: [
    {
      id: 1,
      message: "Hi everyone. I`m happy to be there",
      likecount: 12,
      image:
        "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 2,
      message: "I`m new one",
      likecount: 16,
      image:
        "https://images.hdrsoft.com/images/lighthouse/thumbs/hdr-vibrant.jpg"
    }
  ],
  newPostText: "",
  profile: null,
  status: "Put your status"
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: state.newPostText,
        likecount: 15
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ""
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = text => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
});
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const getUserProfile = userId => dispatch =>
  usersAPI.setUserProfileAPI(userId).then(response => {
    dispatch(setUserProfile(response));
  });
export const setStatus = status => ({ type: SET_STATUS, status });

export const getStatus = userId => dispatch =>
  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response));
  });

export const updateStatus = status => dispatch =>
  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });

export default profileReducer;
