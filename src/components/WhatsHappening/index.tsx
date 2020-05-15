import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { ProfileType } from '../../reducers/profile';
import { TweetType } from '../../reducers/tweets';
import { execute } from '../../util/Server';
import { ProfileImage } from '../UserImages';
import Style from './style';

const WhatsHappening: React.FC<any> = (props) => {

    const profile = useSelector<any, ProfileType>(store => store.profile);
    const [tweet, setTweet] = useState<TweetType>({ Profile: profile, message: '' });

    const postTweet = () => {
        execute('POST', '/tweets/', {
            ok: (responseJson: any) => {
                responseJson &&
                    props.addTweet({
                        ...responseJson,
                        Profile: tweet.Profile
                    });
            }
        }, { ...tweet, profileId: tweet.Profile.username })
    };

    return (
        <div className="container"
            style={Style.container}>
            <div className="row" style={Style.row}>
                <div className="col-md3">
                    <ProfileImage profile={profile} style={Style.profile.image} />
                </div>
                <div className="col">
                    <textarea
                        style={Style.textArea}
                        placeholder="What's happening?"
                        value={tweet?.message ?? ''}
                        onChange={(evt) => setTweet({ ...tweet, message: evt.target.value })}
                    />
                </div>
            </div>
            <div className="row" style={{ marginBottom: 10 }}>
                <div className="col">
                    <button
                        type="button"
                        className="btn float-right"
                        style={{
                            cursor: tweet?.message?.length > 0
                                ? 'pointer'
                                : 'default',
                            backgroundColor: tweet?.message?.length > 0
                                ? '#24a1f2'
                                : '#89cdf7',
                            ...Style.tweet.button
                        }}
                        onClick={tweet.message?.length > 0 ? () => {
                            postTweet();
                            setTweet({ ...tweet, message: '', updatedAt: undefined });
                        } : undefined}>
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default hot(WhatsHappening);