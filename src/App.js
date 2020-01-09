import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import "./index";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/ProfileComponents/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = props => {
  return (
    <div className="App-wrapper">
      <HeaderContainer />
      <Nav />
      <div className="app-wraper-content">
        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
        <Route path="/Dialogs" render={() => <DialogsContainer />} />
        <Route path="/Users" render={() => <UsersContainer />} />
        <Route path="/News" render={() => <News />} />
        <Route path="/Music" render={() => <Music />} />
        <Route path="/Settings" render={() => <Settings />} />
        <Route path="/Login" render={() => <Login />} />
      </div>
    </div>
  );
};

export default App;
