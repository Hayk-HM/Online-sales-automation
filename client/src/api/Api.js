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
  updateEmployeeInformationAdmin(formData) { return instance.put(`/app/employeesadmin/${formData.companyName}/${formData.userId}`, formData,) },
  uploadEmployeePhoto(formData) { return instance.post('app/employees/uploadPhoto', formData) },
  deleteEmployee(formData) { return instance.post(`/app/employees/deleteemployee?company=${formData.company}&id=${formData.id}`) },
})

export const orderApi = ({
  createNewOrder(formData) { return instance.post('/app/order/createneworder', formData) },
  createNewAllOrder(formData) { return instance.post('/app/order/createnewallorder', formData) },
  getAllOrders(formData) { return instance.get(`/app/order/getorders?company=${formData.company}&createDate=${formData.createDate}`) },
  getOneOrder(formData) { return instance.get(`/app/order/getorders?company=${formData.company}&_id=${formData._id}`) },
  getAllOrdersWithBalance(formData) { return instance.get(`/app/order/getallorderswithbalance?company=${formData.company}&createDate=${formData.createDate}`) },
  // getOrdersWithDate(formData) { return instance.get(`/app/order/getorderswithdate?company=${formData.company}&createDate=${formData.createDate}`) }
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
  getMultiOrdersColumnsAdmissibility(formData) { return instance.get(`./app/order/getmultiorderscolumnsadmissibility?company=${formData.company}`) },
})

export const excelApi = ({
  uploadExcelStockBalances(formData) { return instance.post(`/app/excel/uploadexcelstockbalance?company=${formData.company}`, formData.data) },
  uploadExcelWebOrder(formData) { return instance.post(`/app/excel/uploadexcelweborder?company=${formData.company}`, formData.data) },
  getExcels(formData) { return instance.get(`/app/excel/getexcels?company=${formData.company}`) },
  getExcelsWebOrder(formData) { return instance.get(`/app/excel/getexcelsweborder?company=${formData.company}`) },
  getDailyBalance(formData) { return instance.get(`app/excel/getdailybalance?company=${formData.company}`) },
  getDailyWebOrder(formData) { return instance.get(`app/excel/getdailyweborder?company=${formData.company}`) },
  deleteExcelBalance(formData) { return instance.put(`app/excel/deleteexcelbalance`, formData) },
  deleteExcelWebOrder(formData) { return instance.put(`app/excel/deleteexcelweborder`, formData) },
  getDailyWebOrders(formData) { return instance.get(`/app/excel/getdailyweborders?company=${formData.company}&createDate=${formData.createDate}`) }
})

export const departmentApi = ({
  createNewDepartment(formData) { return instance.post(`/app/department/createnewdepartment`, formData) },
  getDepartments(formData) { return instance.get(`/app/department/getdepartments?company=${formData.company}`) },
  getDepartment(formData) { return instance.get(`/app/department/getdepartment?company=${formData.company}&id=${formData.id}`) },
  updateDepartment(formData) { return instance.put(`/app/department/updatedepartment?company=${formData.company}&id=${formData.id}`, formData) },
  deleteDepartment(formData) { return instance.put(`/app/department/deletedepartment?company=${formData.company}&id=${formData.id}`, formData) },
})

export const employeesPositionApi = ({
  createPosition(formData) { return instance.post(`/app/position/createposition`, formData) },
  getPositions(formData) { return instance.get(`/app/position/getpositions?company=${formData.company}`) },
  getPosition(formData) { return instance.get(`/app/position/getposition?company=${formData.company}&id=${formData.id}`) },
  updatePosition(formData) { return instance.put(`/app/position/updateposition?company=${formData.company}&id=${formData.id}`, formData) },
  deletePosition(formData) { return instance.post(`/app/position/deleteposition?company=${formData.company}&id=${formData.id}`) },
})

export const ordersWithBalance = ({
  getOrdersWithBalance(formData) { return instance.get(`/app/getorderswithbalance/getorders?company=${formData.company}&createDate=${formData.createDate}`) }
})

export const orderStatus = ({
  createOrderStatus(formData) { return instance.post(`/app/orderstatus/createorderstatus`, formData) },
  getOrderStatuses(formData) { return instance.get(`/app/orderstatus/getorderstatuses?company=${formData.company}`) },
  getOrderStatus(formData) { return instance.get(`/app/orderstatus/getorderstatus?company=${formData.company}&id=${formData.id}`) },
  updateOrderStatus(formData) { return instance.put(`/app/orderstatus/updateorderstatus?company=${formData.company}&id=${formData.id}`, formData) },
  deleteOrderStatus(formData) { return instance.post(`/app/orderstatus/deleteorderstatus?company=${formData.company}&id=${formData.id}`) },
})
