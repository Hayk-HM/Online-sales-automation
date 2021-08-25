import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

// instance.interceptors.request.use((req) => {
//   if (localStorage.getItem('user')) {
//     req.headers.Authorization(`Bearer ${JSON.parse(localStorage.getItem('user')).token}`)
//   }
//   return req
// }) 

export const authApi = ({
  signIn(formData) { return instance.post('/auth/signin', formData) },
  createCompany(formData) { return instance.post('/auth/signup/createcompany', formData) },
  createTable(formData) { return instance.post('/auth/signup/createtable', formData) },
  insertInfo(formData) { return instance.post('/auth/signup/insertinfo', formData) },
})

export const employeesApi = ({
  getAllEmployees(formData) { return instance.get(`/app/employees/${formData.company}`) },
  getEmployeeInformation(formData) { return instance.get(`/app/employees/${formData.companyName}/${formData.userId}`) },
  updateEmployeeInformation(formData) { return instance.put(`/app/employees/${formData.companyName}/${formData.userId}`, formData,) },
  uploadEmployeePhoto(formData) { return instance.post('app/employees/uploadPhoto', formData) }
})

export const orderApi = ({
  createNewOrder(formData) { return instance.post('/app/order/createneworder', formData) }
})