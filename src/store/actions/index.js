import {createAction, createRequest, createRequestTypes} from '../utils'

/* TYPES */
export const LOGOUT = 'LOGOUT'
export const SAVE_MELODY = 'SAVE_MELODY'

export const logout = () => createAction(LOGOUT)
export const saveMelody = (melody) => createAction(SAVE_MELODY, {melody})

/* REQUESTS */
export const LOGIN = createRequestTypes('LOGIN')
export const GET_SONGS = createRequestTypes('GET_SONGS')
export const CREATE_SONG = createRequestTypes('CREATE_SONG')

export const login = createRequest(LOGIN)
export const getSongs = createRequest(GET_SONGS)
export const createSong = createRequest(CREATE_SONG)
