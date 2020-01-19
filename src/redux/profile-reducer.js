import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";

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
  profile: null,
  status: "Put your status"
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likecount: 15
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ""
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

export const addPostActionCreator = newPostText => ({
  type: ADD_POST,
  newPostText
});

export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const getUserProfile = userId => async dispatch => {
  let response = await usersAPI.setUserProfileAPI(userId);
  dispatch(setUserProfile(response));
};
export const setStatus = status => ({ type: SET_STATUS, status });

export const getStatus = userId => async dispatch => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = status => async dispatch => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
