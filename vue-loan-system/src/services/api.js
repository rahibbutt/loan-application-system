import axios from 'axios'

// baseURL should point to your auth server
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
})

// optional: attach token to every request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
