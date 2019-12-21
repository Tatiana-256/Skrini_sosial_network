const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initialState = {
  users: [
    // {
    //   id: 1,
    //   followed: true,
    //   fullName: "Tatiana Beznosiuk",
    //   status: "Junior developer",
    //   location: { city: "Kiyv", country: "Ukraine" },
    //   image:
    //     "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI"
    // },
    // {
    //   id: 2,
    //   followed: false,
    //   fullName: "Olexandr Nashenko",
    //   status: "Head of department",
    //   location: { city: "Prague", country: "Czech Republic" },
    //   image: "https://admin.bel-solar.by/wp-content/uploads/2018/10/ph1.jpeg"
    // },
    // {
    //   id: 3,
    //   followed: true,
    //   fullName: "Maria Renkovich",
    //   status: "HR",
    //   location: { city: "Warshawa", country: "Poland" },
    //   image:
    //     "https://image.shutterstock.com/image-photo/positive-human-facial-expressions-emotions-260nw-640005181.jpg"
    // }
  ],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
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
    default:
      return state;
  }
};

export const followActionCreator = userId => ({ type: FOLLOW, userId });
export const unfollowActionCreator = userId => ({ type: UNFOLLOW, userId });
export const setUserActionCreator = users => ({ type: SET_USERS, users });
export const setCurrentPageActionCreator = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
export const setUsersTotalCountActionCreator = totalUsersCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount
});

export default usersReducer;
