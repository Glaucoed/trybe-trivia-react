import { SUBMIT_LOGIN_NAME, SUBMIT_LOGIN_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_LOGIN_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case SUBMIT_LOGIN_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
}

export default user;
