import {photosType, profileType} from "../types/types";
import {instance, APIResponseType} from "./api";
import {messageType} from "../redux/dialogs-reducer";

export const messageAPI = {
    getDialogs() {
        return instance.get<Array<messageType>>('dialogs')
            .then(res => res.data)
    },
    putUpDialogs(userId: string) {
        return instance.get(`dialogs/${userId}`)
            .then(res => res.data)

    }
}
