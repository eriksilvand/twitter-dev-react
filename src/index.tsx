import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import { Store } from './store';
import Login from './Login';
import { ProfileType } from './reducers/profile';

const Index: React.FC = () => {

    const profile = useSelector<any, ProfileType>(store => store.profile);

    return (
        <div style={{ fontFamily: "Ubuntu, 'Segoe UI', Verdana" }}>
            {!profile?.username ? <Login /> : <App />}
        </div>
    );
}

ReactDOM.render(
    <Provider store={Store}>
        <Index />
    </Provider>, document.getElementById('root'));