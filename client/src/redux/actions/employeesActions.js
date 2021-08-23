import { employeesApi } from "../../api/Api";

const employeesActions = {
  getEmployees: (formData) => ({ type: 'GET_ALL_EMPLOYEES', payload: formData })
}

export const getAllEmployees = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesApi.getAllEmployees(formData)
    dispatch(employeesActions.getEmployees(data))
  } catch (error) {
    console.log('getAllEmployees', error);
  }
}