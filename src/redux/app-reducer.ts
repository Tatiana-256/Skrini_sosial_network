import {getAuthUserData} from "./auth-reducer";
import {baseThunkType, InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = " app/INITIALIZED_SUCCESS";


let initialState = {
    initialized: false
};

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {...state, initialized: true};
        }
        default:
            return state;
    }
};

type ActionType = InferActionsTypes<typeof appActions>


export const appActions = {initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)}

// ___________thunk-creators_____________

type thunkType = baseThunkType<ActionType, void>

export const initializeApp = (): thunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    });
};

export default appReducer;
