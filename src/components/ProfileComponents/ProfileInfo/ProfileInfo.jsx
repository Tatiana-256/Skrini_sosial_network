import React, { useState, useEffect, setEditMode } from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = props => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = e => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = formData => {
    props.saveProfile(formData);
    setEditMode(false);
  };
  return (
    <div>
      <div>
        <img
          className={classes.fone_picture_color}
          src={props.profile.photos.large || userPhoto}
        />
        {props.isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToAditMode={() => {
              setEditMode(true);
            }}
          />
        )}
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

const ProfileData = props => {
  return (
    <div>
      {props.isOwner && (
        <div>
          <button onClick={props.goToAditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Full name: </b>
        {props.profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b>
        {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>
          {props.profile.lookingForAJobDescription}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
