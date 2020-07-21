import {updateObjectInArray} from "../components/utils/commonObject";
import {photosType, postType, profileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, baseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";

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
    ] as Array<any>,
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

export type ActionCreatorType = InferActionsTypes<typeof profileActions>

// ____________________ACTION CREATORS__________________

export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    setLike: (postId: string) => ({type: SET_LIKE, postId}as const),
    deleteLike: (postId: string) => ({type: DELETE_LIKE, postId}as const),
    setUserProfile: (profile: profileType) => ({type: SET_USER_PROFILE, profile}as const),
    setStatus: (status: string) => ({type: SET_STATUS, status}as const),
    savePhotoSuccess: (photos: photosType) => ({type: SET_PHOTOS_SUCCESS, photos}as const)
}


// ___________thunk-creators_____________

type thunkType = baseThunkType<ActionCreatorType>


export const getUserProfile = (userId: string): thunkType => async (dispatch) => {
    let response = await usersAPI.setUserProfileAPI(userId);
    dispatch(profileActions.setUserProfile(response));
};

export const getStatus = (userId: string): thunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(response));
};

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(profileActions.setStatus(status));
    }
};

export const savePhoto = (file: File): thunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(profileActions.savePhotoSuccess(response.data.data.photos));
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
