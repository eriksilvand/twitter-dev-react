import React, { useEffect } from 'react';
import WhatsHappening from '../WhatsHappening';
import { TweetType } from '../../reducers/tweets';
import { execute } from '../../util/Server';
import { hot } from 'react-hot-loader/root';
import Tweet from '../Tweet';
import { useDispatch, useSelector } from 'react-redux';
import style from './style';

const HomePage: React.FC = () => {

    const tweets = useSelector<any, Array<TweetType>>(store => store.tweets);
    const dispatch = useDispatch();

    const addTweet = (tweet: TweetType) => {
        dispatch({ type: 'ADD_TWEET', tweet });
    }

    const removeTweet = (tweet: TweetType) => {
        dispatch({ type: 'REMOVE_TWEET', tweet });
    };

    const updateImages = () => {
        Array.from(document.getElementsByTagName('img')).forEach((item) => {
            item.src = `${item.src.split('?')[0]}?t=${new Date().getTime()}`;
        })
    }

    useEffect(() => {
        updateImages();
        execute('GET', '/tweets', {
            ok: (responseJson: any) => {
                if (responseJson) {
                    dispatch({ type: 'SET_TWEETS', tweets: responseJson.reverse() });
                }
            },
            error: (responseJson: any) => console.log('error', responseJson),
        });
    }, [dispatch]);


    return (
        <div className="container" style={style.container}>
            <div className="row">
                <div className="col-7" style={{ paddingRight: 3 }}>
                    <WhatsHappening addTweet={addTweet} />
                    <div style={style.tweets.container}>
                        <div className="col" style={style.tweets.header} >
                            {tweets?.map((item: TweetType, index: number) => {
                                return <Tweet removeTweet={removeTweet} key={index} {...item} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div style={style.rightBar.container}>
                        <span style={style.rightBar.title}>What's happening</span>
                        <div style={style.rightBar.news.container}>
                            <span style={style.rightBar.news.header}>COVID-19 · LIVE</span>
                            <p style={style.rightBar.news.body}>COVID-19 updates for the US</p>
                        </div>
                        <div style={style.rightBar.news.container}>
                            <span style={style.rightBar.news.header}>Politics · Trending</span>
                            <p style={style.rightBar.news.body}>For Trump</p>
                        </div>
                        <div style={style.rightBar.news.container}>
                            <span style={style.rightBar.news.header}>Technology · Trending</span>
                            <p style={style.rightBar.news.body}>Did YouTube</p>
                        </div>
                        <div style={style.rightBar.news.container}>
                            <span style={style.rightBar.news.header}>Movies · 22 minutes ago</span>
                            <p style={style.rightBar.news.body}>Scarface remake gets a director</p>
                        </div>
                        <div style={{ marginBottom: 20 }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default hot(HomePage);