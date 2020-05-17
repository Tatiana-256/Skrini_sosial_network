import React from "react";
import classes from "./Users.module.css";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import {userType} from "../../types/types";

type PropsType = {
    onPageChanged: (pageNumber: number) => void, currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    followingInProgress: Array<string>,
    unfollow: (userId: string) => void,
    follow: (userId: string) => void,
    users: Array<userType>
}


let Users: React.FC<PropsType> = ({
                                      currentPage,
                                      onPageChanged,
                                      totalUsersCount,
                                      pageSize,
                                      followingInProgress,
                                      unfollow,
                                      follow,
                                      users,
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

            {users.map(u => (
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow}
                />
            ))}
        </div>
    );
};

export default Users;
