import { orderApi } from "../../api/Api";

const orderActions = {
  createNewOrder: (formData) => ({ type: 'CREATE_NEW_ORDER', payload: formData })
}

export const createNewOrder = (formData) => async (dispatch) => {
  try {
    const { data } = await orderApi.createNewOrder(formData)
    dispatch(orderActions.createNewOrder(data))
  } catch (error) {
    console.log('createNewOrder', error);
  }
}