import {all} from 'redux-saga/effects'

import auth from './auth'
import songs from './songs'

export default function* rootSaga() {
  yield all([
    auth(),
    songs()
  ])
}
