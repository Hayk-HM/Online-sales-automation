const initialState = { excels: [] }

export const getExcelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXCELS': {
      return {
        ...state,
        excels: [...action.payload]
      }
    }

    default:
      return state
  }
}