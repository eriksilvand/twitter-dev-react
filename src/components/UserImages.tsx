import React from 'react';
import { baseUrl } from '../util/Server';

export const ProfileImage: React.FC<any> = (props) => {
    return (
        <img
            className={props.className}
            style={props.style}
            alt="userphoto"
            src={`${baseUrl}/static/profile/${props.profile?.username}.png`}
            onError={(error: any) => {
                error.target.src = props.profile.defaultProfile;
            }} />
    );
}
export const ProfileCover: React.FC<any> = (props) => {
    return (
        <img
            className={props.className}
            style={props.style}
            alt="usercover"
            src={`${baseUrl}/static/cover/${props.profile?.username}.png`}
            onError={(evt: any) => {
                evt.target.src = props.profile.defaultCover;
            }} />
    );
}