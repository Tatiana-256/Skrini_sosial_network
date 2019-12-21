import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images.png";

let Users = props => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className="wrapper">
      {/* <button onClick={this.getUsers}>Get users</button> */}
      <div>
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
              <img
                src={u.photos.small != null ? u.photos.small : userPhoto}
                className={classes.userPhoto}
              />
            </div>
            <div>
              {u.followed ? (
                <button
                  className={classes.but}
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={classes.but}
                  onClick={() => {
                    props.follow(u.id);
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
