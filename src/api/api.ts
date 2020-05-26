import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "55ac5274-f21f-43a3-b42e-5cfba380d176"
    }
});


// __________________Types______________________-


export type APIResponseType<D = {}> = {
    data: D,
    resultCode: ResultCodeEnum,
    messages: Array<string>
}


export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}


