const initialState = []

const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EMPLOYEES': {
      return [
        ...action.payload
      ]
    }
    default:
      return state
  }
}

export default EmployeesReducer
