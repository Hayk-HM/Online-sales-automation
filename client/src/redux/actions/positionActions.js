import { employeesPositionApi } from "../../api/Api"


const positionActions = ({
  createPosition: (formData) => ({ type: 'CREATE_POSITION', payload: formData }),
  getPositions: (formData) => ({ type: 'GET_POSITIONS', payload: formData }),
  getPosition: (formData) => ({ type: 'GET_POSITION', payload: formData }),
  updatePosition: (formData) => ({ type: 'UPDATE_POSITION', payload: formData }),
  deletePosition: (formData) => ({ type: 'DELETE_POSITION', payload: formData }),
})

export const createPositionAction = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesPositionApi.createPosition(formData)
    dispatch(positionActions.createPosition(data))
  } catch (error) {
    console.log(error)
  }
}

export const getPositionsAction = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesPositionApi.getPositions(formData)
    dispatch(positionActions.getPositions(data))
  } catch (error) {
    console.log(error)
  }
}

export const getPositionAction = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesPositionApi.getPosition(formData)
    dispatch(positionActions.getPosition(data))
  } catch (error) {
    console.log(error)
  }
}

export const updatePositionAction = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesPositionApi.updatePosition(formData)
    dispatch(positionActions.updatePosition(data))
  } catch (error) {
    console.log(error)
  }
}

export const deletePositionAction = (formData) => async (dispatch) => {
  try {
    const { data } = await employeesPositionApi.deletePosition(formData)
    dispatch(positionActions.deletePosition(data))
  } catch (error) {
    console.log(error)
  }
}