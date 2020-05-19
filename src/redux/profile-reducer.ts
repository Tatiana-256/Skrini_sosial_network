import {usersAPI, profileAPI} from "../api/api";
import {updateObjectInArray} from "../components/utils/commonObject";
import {photosType, postType, profileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = "profile/ADD-POST";
const SET_LIKE = 'SET_LIKE'
const DELETE_LIKE = 'DELETE_LIKE'
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTOS_SUCCESS = "profile/SET_PHOTOS_SUCCESSE";


// _____________________TYPES FOR STATE______________________


type initialStateType = typeof initialState


let initialState = {
    postData: [
        {
            id: 1,
            message: "Hi everyone. I`m happy to be there",
            image:
                "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            like: true
        },
        {
            id: 2,
            message: "I`m new one",
            image:
                "https://images.hdrsoft.com/images/lighthouse/thumbs/hdr-vibrant.jpg",

            like: true
        }
    ] as Array<postType>,
    profile: null as profileType | null,
    status: "Put your status",
    newPostText: ''
};

let nextPostId = 0

const profileReducer = (state = initialState, action: ActionCreatorType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png',
                id: nextPostId,
                message: action.newPostText,
                like: false
            };
            nextPostId++
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ""
            };
        }
        case SET_LIKE: {
            return {
                ...state,
                postData: updateObjectInArray(state.postData, action.postId, 'id',
                    {like: true})
            }
        }
        case DELETE_LIKE: {
            return {
                ...state,
                postData: updateObjectInArray(state.postData, action.postId, 'id',
                    {like: false})
            }
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
        case SET_PHOTOS_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            };
        }
        default:
            return state;
    }
};

// ____________________TYPES FOR ACTION CREATORS__________________

export type ActionCreatorType = addPostActionCreatorType
    | setLikeType
    | deleteLikeType
    | setUserProfileType
    | setStatusType
    | savePhotoSuccessType


type addPostActionCreatorType = { type: typeof ADD_POST, newPostText: string }
type setLikeType = { type: typeof SET_LIKE, postId: string }
type deleteLikeType = { type: typeof DELETE_LIKE, postId: string }
type setUserProfileType = { type: typeof SET_USER_PROFILE, profile: profileType }
type setStatusType = { type: typeof SET_STATUS, status: string }
type savePhotoSuccessType = { type: typeof SET_PHOTOS_SUCCESS, photos: photosType }


// ____________________ACTION CREATORS__________________

export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({
    type: ADD_POST,
    newPostText
});
export const setLike = (postId: string): setLikeType => ({type: SET_LIKE, postId})
export const deleteLike = (postId: string): deleteLikeType => ({type: DELETE_LIKE, postId})
export const setUserProfile = (profile: profileType): setUserProfileType =>
    ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({
    type: SET_PHOTOS_SUCCESS,
    photos
});

// ___________thunk-creators_____________

type thunkType= ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorType>



export const getUserProfile = (userId: string): thunkType => async (dispatch) => {
    let response = await usersAPI.setUserProfileAPI(userId);
    dispatch(setUserProfile(response));
};

export const getStatus = (userId: string): thunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
};

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (file: any): thunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: profileType): thunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
};

export default profileReducer;
