import { excelApi } from "../../api/Api";

const excelActions = {
  getExcels: (formData) => ({ type: 'GET_EXCELS', payload: formData }),
  getDailyBalance: (formData) => ({ type: 'GET_DAILY_BALANCE', payload: formData }),
}


export const uploadExcelStockBalancesAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.uploadExcelStockBalances(formData)
  } catch (error) {
    console.log('uploadExcelStockBalancesAction', error);
  }
}

export const getExcelsAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getExcels(formData)
    dispatch(excelActions.getExcels(data))
  } catch (error) {
    console.log('getExcelsAction', error);
  }
}

export const getDailyBalanceAction = (formData) => async (dispatch) => {
  try {
    const { data } = await excelApi.getDailyBalance(formData)
    dispatch(excelActions.getDailyBalance(data))
  } catch (error) {
    console.log('getDailyBalanceAction', error);
  }
}