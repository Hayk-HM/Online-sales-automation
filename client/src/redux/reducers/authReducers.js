
const initialState = { user: null }


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SIGNUP': {
      localStorage.setItem('user', JSON.stringify({ ...action.formDate[2].data[0] }))
      return {
        ...state,
        user: { ...action.formDate[2].data[0] }
      }
    }
    case 'USER_SIGNIN': {
      localStorage.setItem('user', JSON.stringify({ ...action.payload?.formDate[0] }))
      if (action.payload?.formDate[0]) {
        action.payload.history.push('/app')
      } else {
        action.payload.history.push('/signin')
      }
      return {
        ...state,
        user: { ...action.payload?.formDate[0] }
      }
    }
    default:
      return state
  }
}

export default userReducer
