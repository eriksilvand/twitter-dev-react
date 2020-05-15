import React, { useState, useEffect } from 'react';
import { execute, upload } from '../../util/Server';
import { hot } from 'react-hot-loader/root';
import Tweet from '../Tweet';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileType } from '../../reducers/profile';
import SVG from '../Svg';
import { TweetType } from '../../reducers/tweets';
import Style from './style';
import { ProfileImage, ProfileCover } from '../UserImages';

const ProfilePage: React.FC = () => {

    const tweets = useSelector<any, Array<TweetType>>(store => store.tweets);
    const profile = useSelector<any, ProfileType>(store => store.profile);
    const dispatch = useDispatch();

    const removeTweet = (tweet: TweetType) => {
        dispatch({ type: 'REMOVE_TWEET', tweet });
    };

    useEffect(() => {
        execute('GET', `/tweets/profile/${profile.username}`, {
            ok: (responseJson: any) => {
                if (responseJson) {
                    dispatch({ type: 'SET_TWEETS', tweets: responseJson.reverse() });
                }
            },
            error: (responseJson: any) => console.log('error', responseJson),
        });
    }, [profile.username, dispatch])

    useEffect(() => {
        updateImages();
    })

    const ProfileBox: React.FC = () => {
        return (
            <div className="container"
                style={Style.profile.container}>
                <div style={{ height: 400 }}>
                    <div className="d-flex align-items-center" style={Style.profile.containerImage}>
                        <ProfileImage profile={profile} style={Style.profile.image} />
                    </div>
                    <div className="col-12" style={Style.profile.containerCover}>
                        <div className="" style={Style.profile.containerCoverBox}>
                            <ProfileCover profile={profile} style={{ height: 200, width: '100%' }} />
                        </div>
                        <div className="float-right" style={{ margin: 10 }}>
                            <button
                                className="btn btn-outline-info"
                                style={Style.profile.edit}
                                data-toggle="modal"
                                data-target="#modalEditProfile">
                                Edit profile
                            </button>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: 'gray', fontSize: 14 }}>
                        <span style={{
                            fontWeight: 800,
                            fontSize: 20,
                            color: 'black'
                        }}>{profile.name}</span>
                        <p>{profile.username}</p>
                        <div className="row">
                            <div className="col-4 d-flex align-items-center">
                                <SVG icon="locale" width={20} fill="gray" /> <span style={{ paddingLeft: 5 }}>San Jose / CA</span>
                            </div>
                            <div className="col-4 d-flex align-items-center">
                                <SVG icon="birthday" width={20} fill="gray" /> <span style={{ paddingLeft: 5 }}>Bour July 01, 1900</span>
                            </div>
                            <div className="col d-flex align-items-center">
                                <SVG icon="joined" width={20} fill="gray" /><span style={{ paddingLeft: 5 }}>Joined {new Date(profile.createdAt ?? '').toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <span style={{ color: 'black', fontWeight: 800 }}>922</span><span> Following</span>
                            </div>
                            <div className="col">
                                <span style={{ color: 'black', fontWeight: 800 }}>875</span><span> Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-center" style={Style.profile.tabs}>
                    <span>Tweets</span>
                </div>
            </div>
        )
    }

    const updateImages = () => {
        Array.from(document.getElementsByTagName('img')).forEach((item) => {
            item.src = `${item.src.split('?')[0]}?t=${new Date().getTime()}`;
        })
    };

    const EditProfile: React.FC = () => {

        const [editProfile, setEditProfile] = useState({
            name: profile.name
        });

        const updateProfile = () => {
            execute('PUT', `/profiles/${profile.username}`, {
                ok: (responseJson: any) => {
                    if (responseJson) {
                        dispatch({
                            type: 'UPDATE_PROFILE',
                            profile: { ...profile, name: editProfile.name }
                        });
                    }
                }
            }, {
                ...profile,
                name: editProfile.name
            });
        };

        const uploadPhoto = (file:any) => {
            upload(`/profiles/${profile.username}/upload/photo`, {
                ok: (responseJson: any) => {
                    if (responseJson.ok) {
                        updateImages();
                    }
                },
                error: (response: any) => {
                    console.log('error', response)
                }
            }, file, 'profile');
        }

        const uploadCover = (file:any) => {
            upload(`/profiles/${profile.username}/upload/cover`, {
                ok: (responseJson: any) => {
                    if (responseJson.ok) {
                        updateImages();
                    }
                },
                error: (response: any) => {
                    console.log('error', response)
                }
            }, file, 'cover');
        }

        return (
            <div className="modal fade" id="modalEditProfile" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ padding: 5 }}>
                            <div className="row">
                                <div className="col-1 d-flex" >
                                    <button
                                        type="button"
                                        style={{ padding: 5 }}
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="col d-flex align-items-center"
                                    style={{ height: 40 }}>
                                    <span className="modal-title"
                                        style={{ fontWeight: 800 }}>
                                        Edit profile
                                    </span>
                                </div>
                            </div>
                            <button type="button" 
                                className="btn float-right" 
                                data-dismiss="modal" 
                                aria-label="Close"
                                style={Style.profile.editProfile.btnSave}
                                onClick={() => {
                                    updateProfile();
                                }}>Save</button>
                        </div>
                        <div className="modal-body" style={{ padding: 2 }}>
                            <div style={{ height: 400 }}>
                                <div className="d-flex align-items-end"
                                    style={{
                                        position: 'absolute',
                                        minHeight: '270px',
                                        maxHeight: '270px',
                                        zIndex: 2,
                                        paddingLeft: 15
                                    }}>
                                    <ProfileImage profile={profile} style={Style.profile.editProfile.profile.image} />
                                    <div className="d-flex align-items-center justify-content-center"
                                        style={Style.profile.editProfile.profile.change}
                                        onClick={() => { document.getElementById('uploadPhoto')?.click(); }}>
                                        <input type="file" name="myImage" id="uploadPhoto" hidden={true}
                                            onChange={(e: any) => { uploadPhoto(e.target.files[0]); }} />
                                        <SVG icon="camera" width={20} fill="white" />
                                    </div>
                                </div>
                                <div className="col-12" style={Style.profile.editProfile.profile.containerCover}>
                                    <div className="d-flex align-items-center" 
                                        style={Style.profile.editProfile.profile.containerCoverBox}>
                                        <ProfileCover profile={profile} style={{ height: 200, width: '100%' }} />
                                        <div className="d-flex align-items-center justify-content-center"
                                            style={Style.profile.editProfile.profile.changeCover}
                                            onClick={() => { document.getElementById('uploadCover')?.click(); }}>
                                            <input type="file" name="myImage" id="uploadCover" hidden={true}
                                                onChange={(e: any) => {
                                                    uploadCover(e.target.files[0]);
                                                }} />
                                            <SVG icon="camera" width={20} fill="white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" style={{color: 'gray',fontSize: 14,}}>
                                    <div className="form-group" style={{ borderBottom: 'solid 2px darkgray' }}>
                                        <label>Name</label>
                                        <input style={{ border: 'none' }}
                                            type="text"
                                            className="form-control"
                                            value={editProfile.name}
                                            onFocus={(evt: any) => {
                                                evt.target.parentNode.style.borderBottom = 'solid 2px #24a1f2';
                                            }}
                                            onChange={(evt) => setEditProfile({ ...editProfile, name: evt.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container" style={Style.container}>
            <div className="row">
                <div className="col-7" style={{ paddingRight: 3 }}>
                    <ProfileBox />
                    <EditProfile />
                    <div style={Style.tweets.container}>
                        <div className="col" style={Style.tweets.header} >
                            {tweets?.map((item: TweetType, index: number) => {
                                return <Tweet removeTweet={removeTweet} key={index} {...item} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={Style.rightBar.container}>
                        <span style={Style.rightBar.title}>What's happening</span>
                        <div style={Style.rightBar.news.container}>
                            <span style={Style.rightBar.news.header}>COVID-19 · LIVE</span>
                            <p style={Style.rightBar.news.body}>COVID-19 updates for the US</p>
                        </div>
                        <div style={Style.rightBar.news.container}>
                            <span style={Style.rightBar.news.header}>Politics · Trending</span>
                            <p style={Style.rightBar.news.body}>For Trump</p>
                        </div>
                        <div style={Style.rightBar.news.container}>
                            <span style={Style.rightBar.news.header}>Technology · Trending</span>
                            <p style={Style.rightBar.news.body}>Did YouTube</p>
                        </div>
                        <div style={Style.rightBar.news.container}>
                            <span style={Style.rightBar.news.header}>Movies · 22 minutes ago</span>
                            <p style={Style.rightBar.news.body}>Scarface remake gets a director</p>
                        </div>
                        <div style={{ marginBottom: 20 }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default hot(ProfilePage);