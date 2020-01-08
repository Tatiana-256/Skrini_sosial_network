import React from "react";
import Profile from "./ProfileComponent";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { usersAPI } from "../../api/api";
import * as axios from "axios";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 5;
    }
    debugger;

    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(function(response) {
        debugger;
        this.props.setUserProfile(response.data);
      })
      .catch(function(error) {
        alert(error.message);
      });

    // usersAPI
    //   .setUserProfileAPI(userId)

    //   .then(response => {
    //     this.props.setUserProfile(response);
    //   });
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profilePage.profile
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);
