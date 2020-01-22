import React, { useState, useEffect } from "react";

const ProfileStatusWithHooks = props => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  let deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  let onStatusChange = e => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <b>Status: </b>{" "}
          <span onClick={activateEditMode}>
            {props.status || "Put your status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            value={status}
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deActivateEditMode}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
