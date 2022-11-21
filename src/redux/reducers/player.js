import { SUBMIT_SCORE, SUBMIT_ASSERTIONS, START_GAME } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case START_GAME:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case SUBMIT_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case SUBMIT_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default:
    return state;
  }
}

export default player;
