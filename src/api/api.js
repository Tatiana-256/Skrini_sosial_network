import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "55ac5274-f21f-43a3-b42e-5cfba380d176"
  }
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },

  unfollowUser(userId) {
    return instance.delete(`follow/${userId}`);
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`);
  },

  setUserProfileAPI(userId) {
    return instance.get(`profile/${userId}`).then(response => response.data);
  },

  logIn() {
    return instance.get(`auth/me`);
  }
};
