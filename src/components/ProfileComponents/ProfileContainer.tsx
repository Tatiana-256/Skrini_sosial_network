import React from "react";
import Profile from "./ProfileComponent";
import {connect} from "react-redux";
import {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
} from "../../redux/profile-reducer";
import {withRouter, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {profileType, userType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";


type mapStateToPropsType = {
    profile: profileType | null,
    status: string,
    authorizedUserId: string | null,
    isAuth: boolean


}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: profileType) => void

}

type TOwnProps = {}


type PropsType = mapDispatchToPropsType & mapStateToPropsType & TOwnProps & RouteComponentProps<{userId: string}>


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: string | null;
        if (!this.props.match.params.userId) {
            userId = this.props.authorizedUserId;
        } else {
            userId = this.props.match.params.userId;
        }

        if(userId){
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        debugger
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, TOwnProps, AppStateType>(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
