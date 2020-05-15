import React, { useEffect } from 'react';
import { TweetType } from '../../reducers/tweets';
import { compareTime } from '../../util/DateFormat';
import { execute } from '../../util/Server';
import { useSelector } from 'react-redux';
import { ProfileType } from '../../reducers/profile';
import SVG from '../../components/Svg';
import { ProfileImage } from '../UserImages';
import Style from './style';

const Tweet: React.FC<TweetType & { removeTweet: Function }> = (props) => {

    const profile = useSelector<any, ProfileType>(store => store.profile);

    useEffect(() => {
        props.Profile.defaultProfile = profile.defaultProfile
    })

    const deleteTweet = () => {
        execute('DELETE', `/tweets/${props.id}`, {
            ok: (responseJson: any) => {
                if (responseJson?.data === 'success') {
                    props.removeTweet(props)
                }
            },
            error: () => {
                alert('não foi possível remover o Tweet :(');
            }
        });
    }

    return (
        <div className="container" style={{ paddingBottom: 15 }}>
            <div className="row">
                <div className="col-md2">
                    <ProfileImage profile={props?.Profile} style={Style.profile.image} />
                </div>
                <div className="col">
                    <span> <b>{props.Profile.name}</b> {props.Profile.verified && <SVG icon="verified" width={17} fill="#24a1f2" />} <span style={{ color: 'gray' }}>{props.Profile.username} - {compareTime(new Date(props.updatedAt ?? '') ?? new Date())}</span></span>
                    {props.Profile.username === profile.username && (<span
                        className="float-right"
                        onClick={() => {
                            deleteTweet();
                        }}
                        style={Style.tweet.delete}>x</span>)}
                    <p>{props.message}</p>
                    {props.media && <p>{props.media}</p>}
                    <div className="row">
                        <div className="col">
                            <div className="row" style={Style.icons.box}>
                                <div className="col-md-2">
                                    <SVG icon="comments" width={17} />
                                </div>
                                <div className="col">
                                    {props.comments?.length ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row" style={Style.icons.box}>
                                <div className="col-md-2">
                                    <SVG icon="retweet" width={17} />
                                </div>
                                <div className="col">
                                    {props.comments?.length ?? 0}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row" style={Style.icons.box}>
                                <div className="col-md-2">
                                    <SVG icon="like" width={17} />
                                </div>
                                <div className="col">
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <SVG icon="share" width={17} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;