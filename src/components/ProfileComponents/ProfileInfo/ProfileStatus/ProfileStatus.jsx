import React from "react";
// import classes from "./ProfileInfo.module.css";
// import Preloader from "../../common/Preloader/Preloader";

class ProfileStatus extends React.Component {
  state = {
    editMode: false
  };
  activateEditMode() {
    this.setState({
      editMode: true
    });
  }
  deActivateEditMode() {
    this.setState({
      editMode: false
    });
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              value={this.props.status}
              autoFocus={true}
              onBlur={this.deActivateEditMode.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
