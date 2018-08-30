import fetchApi from '../../services/fetch'

export const callLogin = data => fetchApi('auth', 'POST', data)
