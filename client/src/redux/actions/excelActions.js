import { excelApi } from "../../api/Api";

const excelActions = {
  getExcels: (formData) => ({ type: 'GET_EXCELS', payload: formData }),
  getExcelsWebOrder: (formData) => ({ type: 'GET_EXCELS_WEB_ORDER', payload: formData }),
  getDailyBalance: (formData) => ({ type: 'GET_DAILY_BALANCE', payload: formData }),
  getDailyWebOrders: (formData) => ({ type: 'GET_DAILY_WEB_ORDERS', payload: formData }),
}


export const uploadExcelStockBalancesAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.uploadExcelStockBalances(formData)
  } catch (error) {
    console.log('uploadExcelStockBalancesAction', error);
  }
}


export const uploadExcelWebOrderAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.uploadExcelWebOrder(formData)
  } catch (error) {
    console.log('uploadExcelStockBalancesAction', error);
  }
}


export const getExcelsBalanceAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getExcels(formData)
    dispatch(excelActions.getExcels(data))
  } catch (error) {
    console.log('getExcelsAction', error);
  }
}

export const getExcelsWebOrderAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getExcelsWebOrder(formData)
    dispatch(excelActions.getExcelsWebOrder(data))
  } catch (error) {
    console.log('getExcelsAction', error);
  }
}

export const getDailyBalanceAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getDailyBalance(formData)
  } catch (error) {
    console.log('getDailyBalanceAction', error);
  }
}

export const getDailyWebOrderAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getDailyWebOrder(formData)
  } catch (error) {
    console.log('getDailyBalanceAction', error);
  }
}



export const deleteExcelBalanceAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.deleteExcelBalance(formData)
  } catch (error) {
    console.log('deleteExcelBalanceAction', error);
  }
}

export const deleteExcelWebOrderAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.deleteExcelWebOrder(formData)
  } catch (error) {
    console.log('deleteExcelBalanceAction', error);
  }
}

export const getDailyWebOrdersAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getDailyWebOrders(formData)
    dispatch(excelActions.getDailyWebOrders(data))
  } catch (error) {
    console.log('getDailyWebOrdersAction', error);
  }
}