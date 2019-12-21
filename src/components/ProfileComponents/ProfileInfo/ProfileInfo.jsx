import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      {/* <div>
        <img
          className={classes.fone_picture}
          // src="http://www.pics4learning.com/images/pics-banner1-1300.jpg"
        />
      </div> */}
      <div>
        <img
          className={classes.fone_picture_color}
          src="https://processing.org/tutorials/pixels/imgs/tint1.jpg"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
