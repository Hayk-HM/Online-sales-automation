const initialState = {
  excels: [],
  excelWebOrder: [],
  dailyBalance: [],
  dailyWebOrders: [],
}

export const getExcelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXCELS': {
      return {
        ...state,
        excels: [...action.payload]
      }
    }
    case 'GET_EXCELS_WEB_ORDER': {
      return {
        ...state,
        excelWebOrder: [...action.payload]
      }
    }
    case 'GET_DAILY_BALANCE': {
      return {
        ...state,
        dailyBalance: [...action.payload]
      }
    }
    case 'GET_DAILY_WEB_ORDERS': {
      return {
        ...state,
        dailyWebOrders: [...action.payload]
      }
    }

    default:
      return state
  }
}