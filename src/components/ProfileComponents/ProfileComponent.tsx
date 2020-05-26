import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from "./ProfileComponents.module.css";
import {profileType} from "../../types/types";

type PropsType = {
    savePhoto: (photoFile: any) => void
    isOwner: boolean
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    saveProfile: (profile: profileType) => Promise<any>
}


const Profile: React.FC<PropsType> = props => {
    return (
        <div className={classes.profile}>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;
