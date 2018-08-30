import {call, put, takeEvery} from 'redux-saga/effects';
import {callLogin} from './api';
import {LOGIN, LOGOUT} from '../../actions';

function* login(action) {
  try {
    const payload = yield call(callLogin, action.payload.data);
    const tomorrow = new Date();
    const exp = tomorrow.setDate(tomorrow.getDate() + 1);

    document.cookie = `token=${payload.response.token}; expires=${exp}`;

    yield put({type: LOGIN.SUCCESS, payload});
  } catch (e) {
    yield put({ type: LOGIN.FAILURE, message: e.message });
  }
}

function* logout() {
  yield (document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;');
}

function* auth() {
  yield takeEvery(LOGIN.REQUEST, login);
  yield takeEvery(LOGOUT, logout);
}

export default auth;
