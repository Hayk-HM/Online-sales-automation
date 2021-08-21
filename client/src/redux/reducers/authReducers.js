
const initialState = { user: null }


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SIGNUP': {
      localStorage.setItem('user', JSON.stringify({ ...action.payload.formDate[action.payload.formDate.length - 1].data }))
      if (action.payload?.formDate) {
        action.payload.history.push('/app/task')
      } else {
        action.payload.history.push('/signin')
      }
      return {
        ...state,
        user: { ...action.payload.formDate[action.payload.formDate.length - 1].data }
      }
    }
    case 'USER_SIGNIN': {
      localStorage.setItem('user', JSON.stringify({ ...action.payload?.formDate }))
      if (action.payload?.formDate) {
        action.payload.history.push('/app/task')
      } else {
        action.payload.history.push('/signin')
      }
      return {
        ...state,
        user: { ...action.payload?.formDate }
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
    default:
      return state
  }
}

export default userReducer
