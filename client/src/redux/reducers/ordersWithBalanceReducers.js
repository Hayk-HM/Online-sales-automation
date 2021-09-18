const initialState = { ordersWithBalance: [] }

const ordersWithBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS_WITH_BALANCE': {
      return {
        ...state,
        ordersWithBalance: [...action.payload]
      }
    }

    default:
      return state
  }
}

export default ordersWithBalanceReducer
