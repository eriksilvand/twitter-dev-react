import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { ProfileType } from '../../reducers/profile';
import { TweetType } from '../../reducers/tweets';
import SVG from '../../components/Svg';
import Style from './style';

const TopBar: React.FC<{ page: string, setPage: Function }> = (props) => {

  const profile = useSelector<any, ProfileType>(store => store.profile);
  const tweets = useSelector<any, Array<TweetType>>(store => store.tweets);

  return (
    <nav className="navbar navbar-expand-lg" style={Style.nav}>
      <div className="col-md-7"
        style={Style.container}>
        <span style={{
          fontSize: 19,
          fontWeight: 900
        }}>
          {props.page === 'home'
            ? (<>
              Home
                  <div className="float-right" style={{ width: 20, marginRight: 10 }}>
                <SVG icon="starts" width={20} fill="#24a1f2" />
              </div>
            </>)
            : (<div className="row">
              <div className="col-1" style={{ cursor: 'pointer' }} onClick={() => {
                props.setPage('home')
              }}>
                <SVG icon="arrowBack" width={20} fill="#24a1f2" />
              </div>
              <div className="col" style={{ marginTop: -8 }}>
                <span >{profile.name}</span>
                <p style={{ fontSize: 11, color: 'gray' }}>{tweets.length + ` ${tweets.length > 1 ? 'Tweets' : 'Tweet'}`}</p>
              </div>
            </div>
            )}
        </span>

      </div>
      <div className="col">
        <div className="row float-right d-flex align-content-center"
          style={Style.search}>
          <div className="col-md3">
            <SVG icon="search" width={20} fill="gray" />
          </div>
          <div className="col justify-content-center">
            <span>Search TwitterDev</span>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default hot(TopBar);