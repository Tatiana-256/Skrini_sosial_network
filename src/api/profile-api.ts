import {photosType, profileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type savePhotosResponseType ={
    photos: photosType
}

export const profileAPI = {
    setUserProfileAPI(userId: string) {
        return instance.get<profileType>(`profile/${userId}`).then(response => response.data);
    },
    getStatus(userId: string) {
        return instance
            .get<string>(`/profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance
            .put<APIResponseType>(`/profile/status`, {status: status})
            .then(response => response.data);
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<savePhotosResponseType>>(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile: profileType) {
        return instance.put<APIResponseType>(`/profile`, profile);
    }
};