import {ResultCodeEnum, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";

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

type thunkType = ThunkAction<Promise<void>, AppStateType, unknown, setAuthUserDataType | FormAction>


export const getAuthUserData = (): thunkType => async (dispatch) => {
    let meData = await usersAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const login = (email: string, password: string, rememberMe: boolean): thunkType => async (dispatch) => {
    let response = await usersAPI.logIn(email, password, rememberMe);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        let message =
            response.messages.length > 0
                ? response.messages[0]
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
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;