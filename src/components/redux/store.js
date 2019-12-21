import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
  _state: {
    dialogsPage: {
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
    },

    profilePage: {
      postData: [
        {
          id: 1,
          message: "Hi everyone. I`m happy to be there",
          likecount: 12,
          image:
            "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          id: 2,
          message: "I`m new one",
          likecount: 16,
          image:
            "https://images.hdrsoft.com/images/lighthouse/thumbs/hdr-vibrant.jpg"
        }
      ],
      newPostText: ""
    },

    usersPage: {
      users: [
        {
          id: 1,
          followed: true,
          fullName: "Tatiana Beznosiuk",
          status: "Junior developer",
          location: { city: "Kiyv", country: "Ukraine" },
          image:
            "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI"
        },
        {
          id: 2,
          followed: false,
          fullName: "Olexandr Nashenko",
          status: "Head of department",
          location: { city: "Prague", country: "Czech Republic" },
          image:
            "https://admin.bel-solar.by/wp-content/uploads/2018/10/ph1.jpeg"
        },
        {
          id: 3,
          followed: true,
          fullName: "Maria Renkovich",
          status: "HR",
          location: { city: "Warshawa", country: "Poland" },
          image:
            "https://image.shutterstock.com/image-photo/positive-human-facial-expressions-emotions-260nw-640005181.jpg"
        }
      ],
      newUser: ""
    }
  },
  _callSubscriber() {
    console.log("state is changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  }
};

export default store;
window.store = store;
