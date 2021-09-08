const initialState = { isLoading: false }

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_START': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'LOADING_END': {
      return {
        ...state,
        isLoading: false
      }
    }

    default:
      return state
  }
}