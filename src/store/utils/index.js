const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export const createAction = (type, payload = {}) => {
  return {type, payload}
};

export const createRequestTypes = base => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
};

export const createRequest = type => ({
  request: data => createAction(type[REQUEST], { data }),
  success: response => createAction(type[SUCCESS], { response }),
  failure: error => createAction(type[FAILURE], { error })
})

export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
