import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";

let Users = props => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.pages}>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p && classes.selected}
              onClick={e => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map(u => (
        <div key={u.id}>
          <span className={classes.left}>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={classes.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  className={classes.but}
                  onClick={() => {
                    axios
                      .delete(
                        // ()
                        `https://social-network.samuraijs.com//api/1.0/follow/${u.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "90bcba07-a798-42d0-8eac-4c6c5530cfd1"
                          }
                        }
                      )
                      .then(response => {
                        if (response.data.resultCode == 0) {
                          props.unfollow(u.id);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={classes.but}
                  onClick={() => {
                    axios
                      .post(
                        // ()
                        `https://social-network.samuraijs.com//api/1.0/follow/${u.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "90bcba07-a798-42d0-8eac-4c6c5530cfd1"
                          }
                        }
                      )
                      .then(response => {
                        if (response.data.resultCode == 0) {
                          props.follow(u.id);
                        }
                      });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span className={classes.right}>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
