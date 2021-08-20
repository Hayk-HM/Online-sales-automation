import { authApi } from "../../api/Api";

const authActions = {
  signUp: (formDate) => ({ type: 'USER_SIGNUP', formDate }),
  signIn: (formDate, history) => ({ type: 'USER_SIGNIN', payload: { formDate, history } })
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

export const signUpAction = (formData) => async (dispatch) => {
  try {
    Promise.all([await authApi.createCompany(formData), await authApi.createTable(formData), await authApi.insertInfo(formData)])
      .then(data => {
        dispatch(authActions.signUp(data))
      })
    // await authApi.createCompany(formData)
    // await authApi.createTable(formData)
    // const { data } = await authApi.insertInfo(formData)
    // dispatch(authActions.signUp(data))
  } catch (error) {
    console.log('signUpAction', error);
  }
}