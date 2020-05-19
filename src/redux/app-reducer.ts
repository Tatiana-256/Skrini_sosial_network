import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ActionCreatorType} from "./profile-reducer";

const INITIALIZED_SUCCESS = " app/INITIALIZED_SUCCESS";


export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: initializedSuccessActionType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {...state, initialized: true};
        }
        default:
            return state;
    }
};

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

// ___________thunk-creators_____________

type thunkType = ThunkAction<void, AppStateType, unknown, initializedSuccessActionType>

export const initializeApp = (): thunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
};

export default appReducer;
