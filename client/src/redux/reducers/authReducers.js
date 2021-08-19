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
      return {
        ...state,
        ...action.formDate
      }
    }

    default:
      return state
  }
}

export default userReducer
