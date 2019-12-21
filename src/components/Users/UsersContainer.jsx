import React from "react";
import { connect } from "react-redux";
import {
  unfollowActionCreator,
  followActionCreator,
  setUserActionCreator,
  setCurrentPageActionCreator,
  setUsersTotalCountActionCreator
} from "../redux/users-reducer";
import Users from "./Users";
import * as axios from "axios";

class UsersContainer extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com//api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then(response => {
        // debugger;
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = pageNumber => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com//api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then(response => {
        // debugger;
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        users={this.props.users}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
      />
    );
  }
}

let mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  };
};

let mapDispatchToProps = dispatch => {
  return {
    follow: userId => {
      dispatch(followActionCreator(userId));
    },
    unfollow: userId => {
      dispatch(unfollowActionCreator(userId));
    },
    setUsers: users => {
      dispatch(setUserActionCreator(users));
    },
    setCurrentPage: pageNumber => {
      dispatch(setCurrentPageActionCreator(pageNumber));
    },
    setTotalUsersCount: totalCount => {
      dispatch(setUsersTotalCountActionCreator(totalCount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// export default
