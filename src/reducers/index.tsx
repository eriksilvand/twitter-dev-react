import { combineReducers } from 'redux';
import profile from './profile';
import tweets from './tweets';
import security from './security';

export default combineReducers({
    profile,
    tweets,
    security
});