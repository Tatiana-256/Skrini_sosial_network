import store from "./store";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

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
  ],
  messagesData: [
    { id: 1, message: "Hey you" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "What do you do?" }
  ],
  newMessageText: ""
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let newMessage = {
        id: 3,
        message: state.newMessageText
      };
      return {
        ...state,
        newMessageText: "",
        messagesData: [...state.messagesData, newMessage]
      };
    }
    case UPDATE_NEW_MESSAGE_TEXT: {
      return { ...state, newMessageText: action.newTextMessage };
    }
    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageChangeActionCreator = text => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newTextMessage: text
});

export default dialogsReducer;
