import { employeesApi } from "../../api/Api";

const employeesActions = {
  getEmployees: (formData) => ({ type: 'GET_ALL_EMPLOYEES', payload: formData }),
  getEmployeeInformation: (formData) => ({ type: 'GET_EMPLOYEE_INFORMATION', payload: formData }),
  updateEmployeeInformation: (formData) => ({ type: 'UPDATE_EMPLOYEE_INFORMATION', payload: formData })
}

export const getAllEmployees = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesApi.getAllEmployees(formData)
    dispatch(employeesActions.getEmployees(data))
  } catch (error) {
    console.log('getAllEmployees', error);
  }
}

export const getEmployeeInformation = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesApi.getEmployeeInformation(formData)
    dispatch(employeesActions.getEmployeeInformation(data))
  } catch (error) {
    console.log('getEmployeeInformation', error);
  }
}

export const updateEmployeeFormData = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesApi.updateEmployeeInformation(formData)
    dispatch(employeesActions.updateEmployeeInformation(data))
  } catch (error) {
    console.log(error);
  }
}

export const uploadEmployeePhoto = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesApi.uploadEmployeePhoto(formData)
  } catch (error) {
    console.log(error);
  }
}
