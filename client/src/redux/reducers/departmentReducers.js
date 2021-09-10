const initialState = {
  departments: [],
  department: {},
}

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENTS': {
      return {
        ...state,
        departments: [...action.payload]
      }
    }
    case 'GET_DEPARTMENT': {
      return {
        ...state,
        department: { ...action.payload }
      }
    }
    default: {
      return state
    }

  }
}

export default departmentReducer
