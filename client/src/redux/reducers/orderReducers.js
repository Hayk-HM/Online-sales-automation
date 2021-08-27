const initialState = { newOrder: {}, orders: [], oneRequestedOrder: {} }

const createNewOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_ORDER': {
      return {
        ...state,
        newOrder: { ...action.payload }
      }
    }

    case 'GET_ALL_ORDERS': {

      return {
        ...state,
        orders: [...action.payload]
      }
    }
    case 'GET_ONE_ORDER': {
      return {
        ...state,
        oneRequestedOrder: { ...action.payload }
      }
    }
    default:
      return state
  }
}

export default createNewOrderReducer
