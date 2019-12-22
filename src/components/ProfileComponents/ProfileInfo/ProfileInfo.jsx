import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div>
        <img
          className={classes.fone_picture_color}
          src={props.profile.photos.large}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
