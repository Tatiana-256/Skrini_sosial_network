import React from "react";
import ReactDOM from "react-dom";
import profileReducer, { addPostActionCreator } from "./profile-reducer";

test.todo("new post should be added"),
  () => {
    let action = addPostActionCreator("World is wonderful");
    let state = {
      postData: [
        {
          id: 1,
          message: "Hi everyone. I`m happy to be there",
          likecount: 12
        },
        {
          id: 2,
          message: "I`m new one",
          likecount: 16
        }
      ]
    };
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(5);
  };
