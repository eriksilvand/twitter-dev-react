import React from 'react';
import { hot } from "react-hot-loader/root";
import { useSelector } from 'react-redux';
import { ProfileType } from '../../reducers/profile';
import { ProfileImage } from '../UserImages';
import Style from '../ProfileBar/style';

const ProfileBar: React.FC<{setPage: Function}> = (props) => {

    const profile = useSelector<any, ProfileType>(store => store.profile);

    return (
        <div className="row fixed-bottom" style={Style.container} onClick={() => props.setPage('profile')}>
            <div className="col-md3 d-flex align-items-center">
                <ProfileImage profile={profile} style={Style.profile.image} />
            </div>
            <div className="col">
                <div className="d-flex align-items-center" style={{ paddingTop: 5 }}>
                    <span>
                        <b style={{ fontSize: 15 }}>{profile.name}</b>
                    </span>
                </div>
                <p style={Style.profile.username}>
                    {profile.username}
                </p>
            </div>
        </div>
    )
};

export default hot(ProfileBar);