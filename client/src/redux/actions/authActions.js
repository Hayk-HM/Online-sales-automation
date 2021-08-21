import { authApi } from "../../api/Api";

export const authActions = {
  signUp: (formDate, history) => ({ type: 'USER_SIGNUP', payload: { formDate, history } }),
  signIn: (formDate, history) => ({ type: 'USER_SIGNIN', payload: { formDate, history } }),
  logOut: (history) => ({ type: 'LOGOUT', payload: history })
}

export const signInAction = (formData, history) => async (dispatch) => {
  try {
    new Promise(async (resolve, reject) => {
      const { data } = await authApi.signIn(formData)
      resolve(data)
    })
      .then(data => {
        dispatch(authActions.signIn(data, history))
      })
  } catch (error) {
    console.log('signInAction', error);
  }
}

export const signUpAction = (formData, history) => async (dispatch) => {
  try {
    Promise.all([await authApi.createCompany(formData), await authApi.createTable(formData), await authApi.insertInfo(formData)])
      .then(data => {
        dispatch(authActions.signUp(data, history))
      })
    // await authApi.createCompany(formData)
    // await authApi.createTable(formData)
    // const { data } = await authApi.insertInfo(formData)
    // dispatch(authActions.signUp(data))
  } catch (error) {
    console.log('signUpAction', error);
  }
}