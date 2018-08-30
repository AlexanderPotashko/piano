import {createReducer} from '../utils'
import {GET_SONGS, SAVE_MELODY} from '../actions';

const initialState = {
  list: []
}

export default createReducer(initialState, {
  [SAVE_MELODY]: (state, action) => ({
    ...state,
    list: state.list.concat(action.payload.melody)
  }),
  [GET_SONGS.SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload.response.songs
  })
})
