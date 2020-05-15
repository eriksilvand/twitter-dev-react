import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { execute } from './util/Server';
import { useDispatch } from 'react-redux';
import SVG from './components/Svg';

const Login: React.FC = () => {

    type LoginType = {
        username?: string,
        password?: string
    }

    const dispatch = useDispatch();
    const [screen, setScreen] = useState('login');

    const loginAction = (login: LoginType) => {
        execute("POST", "/login", {
            ok: (responseJson: any) => {
                if (responseJson?.error) {
                    alert(responseJson?.error);
                    return;
                }
                dispatch({ type: 'UPDATE_PROFILE', profile: responseJson.profile })
                dispatch({ type: 'UPDATE_TOKEN', token: responseJson.token });
            },
            error: (responseJson: any) => {
                alert('Could not connect')
            }
        }, { ...login });
    }

    const registryAction = (registry: LoginType & { repeatPassword?: string, name?: string }) => {
        if (registry.password === registry.repeatPassword) {
            execute("POST", "/profiles", {
                ok: (responseJson: any) => {
                    if (responseJson) {
                        loginAction({ ...responseJson, password: registry.password });
                    }
                }
            }, { ...registry, verified: true, photo: '' });
        } else {
            alert("Passwords don't match");
        }
    }

    const LoginScreen: React.FC = () => {

        const [login, setLogin] = useState<LoginType>({
            username: '',
            password: ''
        });
        return (
            <>
                <h3>Login on TwitterDev</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={login?.username ?? ''}
                        onChange={(evt: any) => setLogin({ ...login, username: evt.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={login?.password ?? ''}
                        onChange={(evt: any) => setLogin({ ...login, password: evt.target.value })}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn" style={{ backgroundColor: '#24a1f2', color: 'white' }} onClick={() => {
                        loginAction(login);
                    }}>Login</button>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
                    <p style={{
                        color: '#24a1f2',
                        cursor: 'pointer'
                    }}
                        onClick={() => setScreen('registry')}>Create account</p>
                </div>
            </>
        );
    }

    const RegistryScreen: React.FC = () => {

        const [registry, setRegistry] = useState<LoginType & { repeatPassword?: string, name?: string }>({});

        return (
            <>
                <h3>Create Account</h3>
                <div className="form-group">
                    <label>What do you want to be called?</label>
                    <input
                        type="text"
                        className="form-control"
                        value={registry?.name ?? ''}
                        placeholder="Mr. Jon Snow"
                        onChange={(evt: any) => setRegistry({ ...registry, name: evt.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={registry?.username ?? ''}
                        placeholder="@JonSnow"
                        onChange={(evt: any) => setRegistry({ ...registry, username: evt.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={registry?.password ?? ''}
                        onChange={(evt: any) => setRegistry({ ...registry, password: evt.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Repeat Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={registry?.repeatPassword ?? ''}
                        onChange={(evt: any) => setRegistry({ ...registry, repeatPassword: evt.target.value })}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn" style={{ backgroundColor: '#24a1f2', color: 'white' }} onClick={() => {
                        registryAction(registry);
                    }}>Create</button>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
                    <p style={{
                        color: '#24a1f2',
                        cursor: 'pointer'
                    }}
                        onClick={() => setScreen('login')}>Login</p>
                </div>
            </>
        )
    }

    return (
        <div className="container mw-50 w-25">
            <div className="d-flex justify-content-center" style={{ marginTop: 20, marginBottom: 20 }}>
                <SVG icon="tweet" width={50} fill="#24a1f2" /><span>dev</span>
            </div>
            {screen === 'login' ? <LoginScreen /> : <RegistryScreen />}
        </div>
    )
}

export default hot(Login);