import { ordersWithBalance } from "../../api/Api";


const ordersWithBalanceActions = {
  getOrdersWithBalance: (formData) => ({ type: 'GET_ORDERS_WITH_BALANCE', payload: formData })
}

export const getOrdersWithBalanceAction = (formData) => async (dispatch) => {
  try {
    const { data } = await ordersWithBalance.getOrdersWithBalance(formData)
    await dispatch(ordersWithBalanceActions.getOrdersWithBalance(data))
  } catch (error) {
    console.log('getOrdersWithBalanceAction', getOrdersWithBalanceAction);
  }
}