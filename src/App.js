import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/ProfileComponents/ProfileComponent";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import "./index";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = props => {
  return (
    <div className="App-wrapper">
      <Header />
      <Nav />
      {/* <BestFriends/> */}
      <div className="app-wraper-content">
        <Route path="/Profile" render={() => <Profile />} />
        <Route path="/Dialogs" render={() => <DialogsContainer />} />
        <Route path="/Users" render={() => <UsersContainer />} />
        <Route path="/News" render={() => <News />} />
        <Route path="/Music" render={() => <Music />} />
        <Route path="/Settings" render={() => <Settings />} />
      </div>
    </div>
  );
};

export default App;
