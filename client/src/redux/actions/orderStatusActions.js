import { orderStatus } from '../../api/Api'

const orderStatusActions = {
  createOrderStatus: (formData) => ({ type: 'CREATE_NEW_ORDER_STATUS', payload: formData }),
  getOrderStatuses: (formData) => ({ type: 'GET_ALL_ORDER_STATUSES', payload: formData }),
  getOrderStatus: (formData) => ({ type: 'GET_ORDER_STATUS', payload: formData }),
  updateOrderStatus: (formData) => ({ type: 'UPDATE_ORDER_STATUS', payload: formData }),
  deleteOrderStatus: (formData) => ({ type: 'DELETE_ORDER_STATUS', payload: formData }),
}

export const createOrderStatusAction = (formData) => async (dispatch) => {
  try {
    const { data } = await orderStatus.createOrderStatus(formData)
    dispatch(orderStatusActions.createOrderStatus(data))
  } catch (error) {
    console.log('createOrderStatusAction', error);
  }
}

export const getOrderStatusesAction = (formData) => async (dispatch) => {
  try {
    const { data } = await orderStatus.getOrderStatuses(formData)
    dispatch(orderStatusActions.getOrderStatuses(data))
  } catch (error) {
    console.log('getOrderStatusesAction', error);
  }
}

export const getOrderStatusAction = (formData) => async (dispatch) => {
  try {
    const { data } = await orderStatus.getOrderStatus(formData)
    dispatch(orderStatusActions.getOrderStatus(data))
  } catch (error) {
    console.log('getOrderStatusAction', error);
  }
}

export const updateOrderStatusAction = (formData) => async (dispatch) => {
  try {
    const { data } = await orderStatus.updateOrderStatus(formData)
    dispatch(orderStatusActions.updateOrderStatus(data))
  } catch (error) {
    console.log('updateOrderStatusAction', error);
  }
}

export const deleteOrderStatusAction = (formData) => async (dispatch) => {
  try {
    const { data } = await orderStatus.deleteOrderStatus(formData)
    dispatch(orderStatusActions.deleteOrderStatus(data))
  } catch (error) {
    console.log('deleteOrderStatusAction', error);
  }
}
