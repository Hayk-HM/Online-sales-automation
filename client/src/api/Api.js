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
  createNewOrder(formData) { return instance.post('/app/order/createneworder', formData) },
  getAllOrders(formData) { return instance.get(`/app/order/getorders?company=${formData.company}`) },
  getOneOrder(formData) { return instance.get(`/app/order/getorders?company=${formData.company}&_id=${formData._id}`) },
})

export const tableColumnsApi = ({
  getOrderColumns(formData) { return instance.get(`/app/order/getordercolumns?company=${formData.company}&table=${formData.table}`) },
  addOrderColumn(formData) { return instance.put('/app/order/addordercolumn', formData) },
  addMultiOrdersColumns(formData) { return instance.put('/app/order/addmultiorderscolumns', formData) },
  deleteOrderColumn(formData) { return instance.put('/app/order/deleteordercolumn', formData) },
  deleteMultiOrderColumn(formData) { return instance.put('/app/order/deletemultiordercolumn', formData) },
  getOrdersAdmissibility(formData) { return instance.get(`/app/order/getOrdersAdmissibility?company=${formData.company}`) },
  changeOrdersVisibility(formData) { return instance.put(`/app/order/changeordersvisibility?company=${formData.company}`, formData) },
  changeMultiOrdersVisibility(formData) { return instance.put(`/app/order/changemultiordersvisibility?company=${formData.company}`, formData) },
  getMultiOrdersColumnsAdmissibility(formData) { return instance.get(`./app/order/getmultiorderscolumnsadmissibility?company=${formData.company}`) }
})

