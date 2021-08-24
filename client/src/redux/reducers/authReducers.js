
const initialState = { user: null }


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SIGNUP': {
      debugger
      localStorage.setItem('user', JSON.stringify({ ...action.payload.formData[action.payload.formData.length - 1].data }))
      if (action.payload?.formData) {
        action.payload.history.push('/app/task')
      } else {
        action.payload.history.push('/signin')
      }
      return {
        ...state,
        user: { ...action.payload.formData[action.payload.formData.length - 1].data }
      }
    }
    case 'USER_SIGNIN': {
      localStorage.setItem('user', JSON.stringify({ ...action.payload?.formData }))
      if (action.payload?.formData) {
        action.payload.history.push('/app/task')
      } else {
        action.payload.history.push('/signin')
      }
      return {
        ...state,
        user: { ...action.payload?.formData }
      }
    }
    case 'LOGOUT': {
      localStorage.clear('user')
      action.payload.push('/signin')
      return {
        ...state,
        user: null
      }
    }
    case 'SET_USER_INFORMATION': {
      return {
        ...state,
        user: { ...action.payload }
      }
    }
    case 'UPDATE_EMPLOYEE_INFORMATION': {
      localStorage.setItem('user', JSON.stringify({ ...action.payload }))
      return {
        ...state,
        user: { ...action.payload }
      }
    }
    default:
      return state
  }
}

export default userReducer
