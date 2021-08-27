import { orderApi } from "../../api/Api";

const orderActions = {
  createNewOrder: (formData) => ({ type: 'CREATE_NEW_ORDER', payload: formData }),
  getAllOrders: (formData) => ({ type: 'GET_ALL_ORDERS', payload: formData }),
  getOneOrder: (formData) => ({ type: 'GET_ONE_ORDER', payload: formData }),
}

export const createNewOrder = (formData) => async (dispatch) => {
  try {
    const { data } = await orderApi.createNewOrder(formData)
    dispatch(orderActions.createNewOrder(data))
  } catch (error) {
    console.log('createNewOrder', error);
  }
}

export const getAllOrders = (formData) => async (dispatch) => {
  try {

    const { data } = await orderApi.getAllOrders(formData)
    dispatch(orderActions.getAllOrders(data))
  } catch (error) {
    console.log('getAllOrders', error);
  }
}

export const getOneOrder = (formData) => async (dispatch) => {
  try {
    const { data } = orderApi.getOneOrder(formData)
    dispatch(orderActions.getOneOrder(data))
  } catch (error) {
    console.log('getOneOrder', error);
  }
}