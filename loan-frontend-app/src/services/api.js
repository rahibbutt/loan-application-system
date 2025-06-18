import axios from 'axios'

const api = axios.create({
  baseURL: 'http://0.0.0.0:3005',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
