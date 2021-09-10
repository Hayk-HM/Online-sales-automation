import { departmentApi } from "../../api/Api";

const departmentActions = {
  newDepartment: (formData) => ({ type: 'CREATE_NEW_DEPARTMENT', payload: formData }),
  getDepartments: (formData) => ({ type: 'GET_DEPARTMENTS', payload: formData }),
  getDepartment: (formData) => ({ type: 'GET_DEPARTMENT', payload: formData }),
  updateDepartment: (formData) => ({ type: 'UPDATE_DEPARTMENT', payload: formData }),
  deleteDepartment: (formData) => ({ type: 'DELETE_DEPARTMENT', payload: formData }),
}

export const newDepartmentAction = (formData) => async (dispatch) => {
  try {
    const { data } = await departmentApi.createNewDepartment(formData)
    dispatch(departmentActions.newDepartment(data))
  } catch (error) {
    console.log('newDepartmentAction', newDepartmentAction);
  }
}

export const getDepartmentsAction = (formData) => async (dispatch) => {
  try {
    const { data } = await departmentApi.getDepartments(formData)
    dispatch(departmentActions.getDepartments(data))
  } catch (error) {
    console.log('getDepartmentsAction', getDepartmentsAction);
  }
}

export const getDepartmentAction = (formData) => async (dispatch) => {
  try {
    const { data } = await departmentApi.getDepartment(formData)
    dispatch(departmentActions.getDepartment(data))
  } catch (error) {
    console.log('getDepartmentAction', getDepartmentAction);
  }
}

export const updateDepartmentAction = (formData) => async (dispatch) => {
  try {
    const { data } = await departmentApi.updateDepartment(formData)
    dispatch(departmentActions.updateDepartment(data))
  } catch (error) {
    console.log('updateDepartmentAction', updateDepartmentAction);
  }
}

export const deleteDepartmentAction = (formData) => async (dispatch) => {
  try {
    const { data } = await departmentApi.deleteDepartment(formData)
    dispatch(departmentActions.deleteDepartment(data))
  } catch (error) {
    console.log('deleteDepartmentAction', deleteDepartmentAction);
  }
}