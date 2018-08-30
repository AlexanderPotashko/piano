import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import auth from './auth'
import melodies from './melodies'

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  melodies
})

export default rootReducer
