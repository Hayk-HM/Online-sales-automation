const initialState = { newOrder: {}, orders: [] }

const createNewOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_ORDER': {
      return {
        ...state,
        newOrder: { ...action.payload }
      }
    }
    default:
      return state
  }
}

export default createNewOrderReducer
