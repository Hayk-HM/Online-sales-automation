const initialState = {
  excels: [],
  dailyBalance: [],
}

export const getExcelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXCELS': {
      return {
        ...state,
        excels: [...action.payload]
      }
    }
    case 'GET_DAILY_BALANCE': {
      return {
        ...state,
        dailyBalance: [...action.payload]
      }
    }

    default:
      return state
  }
}