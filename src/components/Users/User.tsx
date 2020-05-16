import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images.png";
import {NavLink} from "react-router-dom";
import {userType} from "../../types/types";

type PropsType = {
    user: userType, followingInProgress: Array<number>, unfollow: (userId: string) => void, follow: (userId: string) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return (
        <div>
      <span className={classes.left}>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
                src={user.photos.small != null ? user.photos.small : userPhoto}
                className={classes.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
              <button
                  disabled={followingInProgress.some((id):boolean => id === user.id)}
                  className={classes.but}
                  onClick={() => {
                      unfollow(user.id);
                  }}
              >
                  Unfollow
              </button>
          ) : (
              <button
                  disabled={followingInProgress.some((id):boolean => id === user.id)}
                  className={classes.but}
                  onClick={() => {
                      follow(user.id);
                  }}
              >
                  Follow
              </button>
          )}
        </div>
      </span>
            <span className={classes.right}>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"u.location.city"}</div>
          <div>{"u.location.country"}</div>
        </span>
      </span>
        </div>
    );
};

export default User;
