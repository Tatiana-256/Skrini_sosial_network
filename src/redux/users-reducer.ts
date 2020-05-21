import {ResultCodeEnum, usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utils/commonObject";
import {userType} from "../types/types";
import {AppStateType} from "./redux-store";
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

type actionsTypes = followSuccessType
    | unfollowSuccessType
    | setUsersTotalCountType
    | setUserType
    | setCurrentPageType
    | toggleIsFetchingType
    | toggleFollowingProgressType

type followSuccessType = { type: typeof FOLLOW, userId: string }
type unfollowSuccessType = { type: typeof UNFOLLOW, userId: string }
type setUserType = { type: typeof SET_USERS, users: Array<userType> }
type setCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
type setUsersTotalCountType = { type: typeof SET_TOTAL_USERS_COUNT, count: totalUsersCountType }
type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
type toggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: string }

type totalUsersCountType = number

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

export const followSuccess = (userId: string): followSuccessType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: string): unfollowSuccessType => ({type: UNFOLLOW, userId});
export const setUser = (users: Array<userType>): setUserType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});


export const toggleFollowingProgress = (isFetching: boolean, userId: string): toggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

// ___________thunk-creators_____________

type thunkType = ThunkAction<Promise<void>, AppStateType, unknown, actionsTypes>
type DispatchType = Dispatch<actionsTypes>


export const getUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUser(response.items));
    dispatch(setUsersTotalCount(response.totalCount));
};

const followUnfollow = async (dispatch: DispatchType, userId: string, apiMethod: any, action: (userId: string) => followSuccessType | unfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(action(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: string): thunkType => async (dispatch) => {
    await followUnfollow(
        dispatch,
        userId,
        usersAPI.followUser.bind(userId),
        followSuccess
    );
};

export const unfollow = (userId: string): thunkType => async (dispatch) => {
    await followUnfollow(
        dispatch,
        userId,
        usersAPI.unfollowUser.bind(userId),
        unfollowSuccess
    );
};

export default usersReducer;
