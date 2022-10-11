import { combineReducers } from 'redux';
import user from './login';
import player from './player';

const rootReducer = combineReducers({ user, player });

export default rootReducer;
