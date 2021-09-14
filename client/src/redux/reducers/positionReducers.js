const initialState = { positions: [], position: {} }

const positionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSITIONS': {
      return {
        ...state,
        positions: [...action.payload]
      }
    }
    case 'GET_POSITION': {
      return {
        ...state,
        position: { ...action.payload }
      }
    }

    default:
      return state
  }
}

export default positionReducers