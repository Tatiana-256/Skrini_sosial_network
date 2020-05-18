import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getAllUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from "../../redux/users-selectors";
import {userType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type mapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,

    users: Array<userType>,
    followingInProgress: any // change


}
type mapDispatchToPropsType = {

    follow: (userId: string) => void,
    unfollow: (userId: string) => void,
    setCurrentPage: (currentPage: number, pageSize: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    toggleFollowingProgress: () => void

}

type OwnPropsType = {}

type PropsType = mapDispatchToPropsType & mapStateToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};


export default compose(
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow: follow,
        unfollow: unfollow,
        setCurrentPage: setCurrentPage,
        getUsers: getUsers,
        toggleFollowingProgress
    })
)(UsersContainer);
