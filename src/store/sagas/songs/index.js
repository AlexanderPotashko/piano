import {call, put, takeEvery} from 'redux-saga/effects'
import {callGetSongs, callCreateSong} from './api'
import {GET_SONGS, CREATE_SONG, SAVE_MELODY} from '../../actions'

function* getSongs(action) {
  try {
    const payload = yield call(callGetSongs, action.payload.melody)

    yield put({type: GET_SONGS.SUCCESS, payload})
  } catch (e) {
    yield put({ type: GET_SONGS.FAILURE, message: e.message })
  }
}

function* createSong(action) {
  try {
    yield put({type: CREATE_SONG.REQUEST})

    const payload = yield call(callCreateSong, action.payload.melody)

    yield put({type: CREATE_SONG.SUCCESS, payload})
  } catch (e) {
    yield put({ type: CREATE_SONG.FAILURE, message: e.message })
  }
}

function* auth() {
  yield takeEvery(GET_SONGS.REQUEST, getSongs)
  yield takeEvery(SAVE_MELODY, createSong)
}

export default auth
