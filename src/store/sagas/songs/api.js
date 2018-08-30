import fetchApi from '../../services/fetch'

export const callGetSongs = (data) => fetchApi('songs', 'GET', data)
export const callCreateSong = (data) => fetchApi('songs', 'POST', data)
