import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utils/commonObject";
import { userType} from "../types/types";

const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";
const SET_USERS = "user/SET_USERS";
const SET_CURRENT_PAGE = "user/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "user/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "user/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "user/TOGGLE_IS_FOLLOWING_PROGRESS";


// ____________________TYPES________________________

type followingInProgressType = {
    userId: number
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

// ___________action-creators_____________

const usersReducer = (state = initialState, action: any): initialStateType => {
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
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }
        default:
            return state;
    }
};


// ____________________TYPES FOR ACTION CREATORS__________________

type followSuccessType = { type: typeof FOLLOW, userId: number }
type unfollowSuccessType = { type: typeof UNFOLLOW, userId: number }
type setUserType = { type: typeof SET_USERS, users: Array<userType> }
type setCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
type setUsersTotalCountType = { type: typeof SET_TOTAL_USERS_COUNT, count: totalUsersCountType }
type toggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
type toggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }

type totalUsersCountType = number


// ____________________ACTION CREATORS__________________

export const followSuccess = (userId: number): followSuccessType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number): unfollowSuccessType => ({type: UNFOLLOW, userId});
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
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

// ___________thunk-creators_____________

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUser(response.items));
    dispatch(setUsersTotalCount(response.totalCount));
};

const followUnfollow = async (dispatch: any, userId: number, apiMethod: any, action: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(action(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollow(
        dispatch,
        userId,
        usersAPI.followUser.bind(userId),
        followSuccess
    );
};

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollow(
        dispatch,
        userId,
        usersAPI.unfollowUser.bind(userId),
        unfollowSuccess
    );
};

export default usersReducer;
