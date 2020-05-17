import React, {ChangeEvent} from "react";


type propsType={
  status:string
  updateStatus: (status: string)=> void
}

type stateType={
  editMode: boolean,
  status: string
}


class ProfileStatus extends React.Component<propsType, stateType>{
  state = {
    editMode: false,
    status: this.props.status
  };
  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  };
  deActivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    });
  };

  componentDidUpdate = (prevProps: propsType, prevState: stateType) => {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "Put your status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              autoFocus={true}
              onBlur={this.deActivateEditMode}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
