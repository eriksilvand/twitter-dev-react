import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'
import HomePage from './components/HomePage';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import ProfilePage from './components/ProfilePage';

const App: React.FC<any> = () => {

  const [page, setPage] = useState<string>('home');

  const pages: any = {
    home: <HomePage />,
    profile: <ProfilePage />
  }

  return (
    <>
      <div className="wrapper" style={{ 
        display: 'flex', 
        width: '100%'}}>
        <SideBar {...{ setPage, page }} />
        <TopBar {...{ setPage, page }} />
        <div id="content" style={{
          width: 'calc(100% - 255px)',
          minHeight: '100vh',
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
          {pages[page] ?? <>404 - Page not found</>}
        </div>
      </div>
    </>
  );

}

export default hot(App);
