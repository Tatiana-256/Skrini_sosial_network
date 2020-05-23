import {ResultCodeEnum, usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utils/commonObject";
import {userType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";
const SET_USERS = "user/SET_USERS";
const SET_CURRENT_PAGE = "user/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "user/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "user/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "user/TOGGLE_IS_FOLLOWING_PROGRESS";


// ____________________TYPES________________________

type followingInProgressType = {
    userId: string
}

type initialStateType = typeof initialState

//________________-STATE_____________________________
let initialState = {
    users: [] as Array<userType>,
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<followingInProgressType>
};
// ____________________TYPES FOR ACTION CREATORS__________________

type actionsTypes = InferActionsTypes<typeof userActions>


// ___________action-creators_____________

const usersReducer = (state = initialState, action: actionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: true
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false
                })
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count};
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, {userId: action.userId}]
                    : state.followingInProgress.filter(data => data.userId !== action.userId)
            };
        }
        default:
            return state;
    }
};


// ____________________ACTION CREATORS__________________

export const userActions = {
    followSuccess: (userId: string) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: string) => ({type: UNFOLLOW, userId} as const),
    setUser: (users: Array<userType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: string) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)
}


// ___________thunk-creators_____________

type thunkType = ThunkAction<Promise<void>, AppStateType, unknown, actionsTypes>
type DispatchType = Dispatch<actionsTypes>


export const getUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch) => {
    dispatch(userActions.toggleIsFetching(true));
    dispatch(userActions.setCurrentPage(currentPage));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(userActions.toggleIsFetching(false));
    dispatch(userActions.setUser(response.items));
    dispatch(userActions.setUsersTotalCount(response.totalCount));
};

const followUnfollow = async (dispatch: DispatchType, userId: string, apiMethod: any, action: (userId: string) => actionsTypes) => {
    dispatch(userActions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(action(userId));
    }
    dispatch(userActions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: string): thunkType => async (dispatch) => {
    await followUnfollow(
        dispatch,
        userId,
        usersAPI.followUser.bind(userId),
        userActions.followSuccess
    );
};

export const unfollow = (userId: string): thunkType => async (dispatch) => {
    await followUnfollow(
        dispatch,
        userId,
        usersAPI.unfollowUser.bind(userId),
        userActions.unfollowSuccess
    );
};

export default usersReducer;
