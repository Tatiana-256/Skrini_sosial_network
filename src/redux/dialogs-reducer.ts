import store from "./store";

const ADD_MESSAGE = "dialogs/ADD_MESSAGE";

let initialState = {
    dialogsData: [
        {
            id: 1,
            name: "Tania",
            image:
                "https://telegraf.com.ua/files/2019/06/portrait-2865605_960_720.jpg"
        },
        {
            id: 2,
            name: "Sasha",
            image:
                "https://media.istockphoto.com/photos/reflections-in-lake-matheson-picture-id535204076?k=6&m=535204076&s=612x612&w=0&h=isL2lHZq41HcdyWGFBE3X800JTOxOCqahQBj5K_Kv7Y="
        },
        {
            id: 3,
            name: "Inna",
            image: "https://jooinn.com/images/girl-162.jpg"
        }
    ] as Array<dialogType>,
    messagesData: [
        {id: 1, message: "Hey you"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "What do you do?"}
    ] as Array<messageType>
};

// _________________TYPES__________________

export type initialStateType = typeof initialState

type dialogType = {
    id: null | number,
    name: null | string,
    image: null | string,
}

type messageType = {
    id: null | number,
    message: null | string,
}

type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    addNewMessage: string
}

// _____________________REDUCER_________________________

const dialogsReducer = (state = initialState, action: addMessageActionCreatorType): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 3,
                message: action.addNewMessage
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            };
        }
        default:
            return state;
    }
};

export const addMessageActionCreator = (addNewMessage: string): addMessageActionCreatorType => ({
    type: ADD_MESSAGE,
    addNewMessage
});

export default dialogsReducer;
