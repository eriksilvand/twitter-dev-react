import React from 'react'
import { hot } from 'react-hot-loader/root';
import ProfileBar from '../ProfileBar';
import SVG from '../../components/Svg';
import Style from './style';

const SideBar: React.FC<{ page: string, setPage: Function }> = (props) => {
    return (
        <nav id="sidebar" style={Style.nav}>
            <div className="sidebar-header d-flex" onClick={() => {
                props.setPage('home')
            }}>
                <SVG icon="tweet" width={30} fill="#24a1f2" /><span style={{ fontSize: 10 }}>dev</span>
            </div>
            <div style={{ paddingTop: 20 }}>
                <div className="row" style={Style.menu.home.box}>
                    <div className="col-3">
                        <SVG icon="home" width={30} fill={props.page === 'home' ? '#24a1f2' : ''} />
                    </div>
                    <div className="col">
                        <span style={{
                            color: props.page === 'home' ? '#24a1f2' : '',
                            ...Style.menu.home.name
                        }} onClick={() => { props.setPage('home') }}>
                            Home
                        </span>
                    </div>
                </div>
                <div className="row" style={Style.menu.profile.box}>
                    <div className="col-3">
                        <SVG icon="profile" width={30} fill={props.page === 'profile' ? '#24a1f2' : ''} />
                    </div>
                    <div className="col">
                        <span style={{
                            color: props.page === 'profile' ? '#24a1f2' : '',
                            ...Style.menu.profile.name
                        }} onClick={() => { props.setPage('profile') }}>
                            Profile
                        </span>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: 40 }}>
                    <button
                        className="btn"
                        style={Style.menu.tweet}>
                        Tweet
                    </button>
                </div>
            </div>
            <ProfileBar setPage={props.setPage}/>
        </nav>
    )
};

export default hot(SideBar);