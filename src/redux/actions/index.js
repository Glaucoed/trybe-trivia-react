export const SUBMIT_LOGIN_EMAIL = 'SUBMIT_LOGIN_EMAIL';
export const SUBMIT_LOGIN_NAME = 'SUBMIT_LOGIN_NAME';
export const SUBMIT_SCORE = 'SUBMIT_SCORE';

export const submitUserEmail = (payload) => ({ type: SUBMIT_LOGIN_EMAIL, payload });
export const submitUserName = (payload) => ({ type: SUBMIT_LOGIN_NAME, payload });
export const submitScore = (payload) => ({ type: SUBMIT_SCORE, payload });
