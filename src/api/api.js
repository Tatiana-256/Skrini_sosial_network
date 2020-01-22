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
    return profileAPI.setUserProfileAPI(userId);
  },

  me() {
    return instance.get(`auth/me`);
  },
  logIn(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logOut() {
    return instance.delete(`auth/login`);
  }
};

export const profileAPI = {
  setUserProfileAPI(userId) {
    return instance.get(`profile/${userId}`).then(response => response.data);
  },
  getStatus(userId) {
    return instance
      .get(`/profile/status/${userId}`)
      .then(response => response.data);
  },
  updateStatus(status) {
    return instance
      .put(`/profile/status`, { status: status })
      .then(response => response.data);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`/profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  saveProfile(profile) {
    return instance.put(`/profile`, profile);
  }
};
