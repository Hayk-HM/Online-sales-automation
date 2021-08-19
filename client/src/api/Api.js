import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const authApi = ({
  signIn(formData) { return instance.post('/auth/signin', formData) },
  createCompany(formData) { return instance.post('/auth/signup/createcompany', formData) },
  createTable(formData) { return instance.post('/auth/signup/createtable', formData) },
  insertInfo(formData) { return instance.post('/auth/signup/insertinfo', formData) },
})