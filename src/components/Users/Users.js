import React from "react";
import classes from "./Users.module.css";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

let Users = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  followingInProgress,
  unfollow,
  follow,
  ...props
}) => {
  return (
    <div className={classes.wrapper}>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />

      {props.users.map(u => (
        <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          unfollow={unfollow}
          follow={follow}
          followingInProgress={followingInProgress}
        />
      ))}
    </div>
  );
};

export default Users;
