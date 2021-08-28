import { orderApi, tableColumnsApi } from "../../api/Api";

const orderActions = {
  createNewOrder: (formData) => ({ type: 'CREATE_NEW_ORDER', payload: formData }),
  getAllOrders: (formData) => ({ type: 'GET_ALL_ORDERS', payload: formData }),
  getOneOrder: (formData) => ({ type: 'GET_ONE_ORDER', payload: formData }),
  getOrderColumns: (formData) => ({ type: 'GET_ORDER_COLUMNS', payload: formData }),
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

export const getOrderColumns = (formData) => async (dispatch) => {
  try {

    const { data } = await tableColumnsApi.getOrderColumns(formData)
    dispatch(orderActions.getOrderColumns(data))
  } catch (error) {
    console.log('getOrderColumns', error)
  }
}

export const deleteOrderColumn = (formData) => async (dispatch) => {
  try {
    await tableColumnsApi.deleteOrderColumn(formData)
    dispatch(getOrderColumns(formData))
  } catch (error) {
    console.log('deleteOrderColumn', deleteOrderColumn);
  }
}

export const addOrderColumn = (formData) => async (dispatch) => {
  try {
    await tableColumnsApi.addOrderColumn(formData)
    dispatch(getOrderColumns(formData))
  } catch (error) {
    console.log('addOrderColumn', error);
  }
}