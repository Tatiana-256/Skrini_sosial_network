import axios from "axios";
import {photosType, profileType, userType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "55ac5274-f21f-43a3-b42e-5cfba380d176"
    }
});


// __________________Types______________________-


export enum ResultCodeEnum {
    Success = 0,
    Error = 1

}



type GetUsers = {
  items: Array<userType>
  totalCount: number
  error: string
}

type MeResponseType = {
    data: { id: string, email: string, login: string },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

type AuthResponseType = {
    data: {userId: string },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

type UserStatusResponseType = {
    data: {status: string },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}
type UserPhotoResponseType = {
    data: photosType,
    resultCode: ResultCodeEnum,
    messages: Array<string>
}


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance
            .get<GetUsers>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    unfollowUser(userId: string) {
        return instance.delete(`follow/${userId}`);
    },
    followUser(userId: string) {
        return instance.post<AuthResponseType>(`follow/${userId}`).then(res => res.data);
    },

    setUserProfileAPI(userId: string) {
        return profileAPI.setUserProfileAPI(userId);
    },

    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    logIn(email: string, password: string, rememberMe = false) {
        return instance.post<AuthResponseType>(`auth/login`, {email, password, rememberMe}).then(res=> res.data);
    },
    logOut() {
        return instance.delete(`auth/login`);
    }
};

export const profileAPI = {
    setUserProfileAPI(userId: string) {
        return instance.get<profileType>(`profile/${userId}`).then(response => response.data);
    },
    getStatus(userId: string) {
        return instance
            .get<any>(`/profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance
            .put<UserStatusResponseType>(`/profile/status`, {status: status})
            .then(response  => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<any>(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile: profileType) {
        return instance.put(`/profile`, profile);
    }
};
