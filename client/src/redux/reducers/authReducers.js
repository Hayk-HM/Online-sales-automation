const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SIGNUP': {
      return {
        ...state,
        ...action.formDate
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
