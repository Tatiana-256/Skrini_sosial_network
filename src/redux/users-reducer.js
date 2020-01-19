import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/commonObject";

const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";
const SET_USERS = "user/SET_USERS";
const SET_CURRENT_PAGE = "user/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "user/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "user/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "user/TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 7,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

// ___________action-creators_____________

const usersReducer = (state = initialState, action) => {
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
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      };
    }
    default:
      return state;
  }
};

export const followSuccess = userId => ({ type: FOLLOW, userId });
export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId });
export const setUser = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
export const setUsersTotalCount = totalUsersCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount
});
export const toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

// ___________thunk-creators_____________

export const getUsers = (currentPage, pageSize) => async dispatch => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  let response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUser(response.items));
  dispatch(setUsersTotalCount(response.totalCount));
};

const followUnfollow = async (dispatch, userId, apiMethod, action) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode == 0) {
    dispatch(action(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = userId => async dispatch => {
  followUnfollow(
    dispatch,
    userId,
    usersAPI.followUser.bind(userId),
    followSuccess
  );
};

export const unfollow = userId => async dispatch => {
  followUnfollow(
    dispatch,
    userId,
    usersAPI.unfollowUser.bind(userId),
    unfollowSuccess
  );
};

export default usersReducer;
