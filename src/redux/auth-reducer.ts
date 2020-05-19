import {usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ActionCreatorType} from "./profile-reducer";

const SET_USER_DATA = "auth/SET_USER_DATA";

export type initialStateType2 = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataTypePayloadType
}

type setAuthUserDataTypePayloadType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

let initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: setAuthUserDataType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload};
        }
        default:
            return state;
    }
};

export const setAuthUserData = (userId: string | null, email: string | null,
                                login: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});



// ___________thunk-creators_____________

type thunkType= ThunkAction<Promise<void>, AppStateType, unknown, setAuthUserDataType>


export const getAuthUserData = (): thunkType => async (dispatch) => {
    let response = await usersAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};




export const login = (email: string, password: string, rememberMe: boolean):thunkType => async (dispatch) => {
    let response = await usersAPI.logIn(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let message =
            response.data.messages.length > 0
                ? response.data.messages[0]
                : "Some error";
        dispatch(
            stopSubmit("login", {
                _error: message
            })
        );
    }
};
export const logout = (): thunkType => async (dispatch) => {
    let response = await usersAPI.logOut();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;