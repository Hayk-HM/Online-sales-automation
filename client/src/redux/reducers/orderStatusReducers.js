const initialState = {
  newOrderStatus: {},
  orderStatuses: [],
  orderStatus: {}
}

const orderStatusReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_ORDER_STATUS': {
      return {
        ...state,
        newOrderStatus: { ...action.payload }
      }
    }
    case 'GET_ALL_ORDER_STATUSES': {
      return {
        ...state,
        orderStatuses: [...action.payload]
      }
    }
    case 'GET_ORDER_STATUS': {
      return {
        ...state,
        orderStatus: { ...action.payload }
      }
    }

    default:
      return state
  }
}

export default orderStatusReducers
