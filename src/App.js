import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Route, withRouter } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import "./index";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/ProfileComponents/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
// import classes from "*.module.css";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
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
  }
}

let mapStateToProps = state => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
