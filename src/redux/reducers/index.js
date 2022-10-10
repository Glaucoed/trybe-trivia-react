import { combineReducers } from 'redux';
import user from './login';
import game from './game';

const rootReducer = combineReducers({ user, game });

export default rootReducer;
