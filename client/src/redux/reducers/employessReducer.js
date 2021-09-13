const initialState = {
  employees: [],
  employee: {}
}

const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EMPLOYEES': {
      return {
        ...state,
        employees: [...action.payload]
      }
    }
    case 'GET_EMPLOYEE_INFORMATION': {
      return {
        ...state,
        employee: { ...action.payload }
      }
    }
    case 'UPDATE_EMPLOYEE': {
      return {
        ...state,
        employee: { ...action.payload }
      }
    }
    default:
      return state
  }
}

export default EmployeesReducer
