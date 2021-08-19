import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const authApi = ({
  signIn(formData) { return instance.post('/auth/signin', formData) },
  signUp(formData) { return instance.post('/auth/signup', formData) }
})