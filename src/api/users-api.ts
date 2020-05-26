import {instance, APIResponseType} from "./api";
import {userType} from "../types/types";
import {profileAPI} from "./profile-api";
import {AxiosPromise} from "axios";


type GetUsers = {
    items: Array<userType>
    totalCount: number
    error: string
}


type MeResponseType = { id: string, email: string, login: string }

type AuthResponseType = { userId: string }


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance
            .get<GetUsers>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    unfollowUser(userId: string) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    },
    followUser(userId: string) {
        return instance.post<APIResponseType<AuthResponseType>>(`follow/${userId}`).then(res => res.data);
    },

    setUserProfileAPI(userId: string) {
        return profileAPI.setUserProfileAPI(userId);
    },

    me() {
        return instance.get<APIResponseType<MeResponseType>>(`auth/me`).then(res => res.data);
    },
    logIn(email: string, password: string, rememberMe = false) {
        return instance.post<APIResponseType<AuthResponseType>>(`auth/login`, {
            email,
            password,
            rememberMe
        }).then(res => res.data);
    },
    logOut() {
        return instance.delete(`auth/login`);
    }
};