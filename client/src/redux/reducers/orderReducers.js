const initialState = {
  newOrder: {},
  orders: [],
  oneRequestedOrder: {},
  orderColumns: [],
  ordersAdmissibility: [],
  multiOrdersAdmissibility: [],
  allOrdersWithBalance: []
}

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
    case 'GET_ORDER_COLUMNS': {
      return {
        ...state,
        orderColumns: [...action.payload]
      }
    }
    case 'GET_ORDERS_ADMISSIBILITY': {
      return {
        ...state,
        ordersAdmissibility: [...action.payload]
      }
    }
    case 'CHANGE_ORDERS_VISIBILITY': {
      return {
        ...state,
        ordersAdmissibility: [...action.payload]
      }
    }
    case 'GET_MULTI_ORDERS_COLUMNS_ADMISSIBILITY': {
      return {
        ...state,
        multiOrdersAdmissibility: [...action.payload]
      }
    }
    case 'GET_ALL_ORDERS_WITH_BALANCE': {
      return {
        ...state,
        allOrdersWithBalance: [action.payload]
      }
    }

    default:
      return state
  }
}

export default createNewOrderReducer
