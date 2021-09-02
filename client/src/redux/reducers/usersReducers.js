const initialState = []

export const getActiveUsers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACTIVE_USERS': {
      return [
        ...action.payload
      ]
    }

    default:
      return state
  }
}