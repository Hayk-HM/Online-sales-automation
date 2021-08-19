import { authApi } from "../../api/Api";

const authActions = {
  signUp: (formDate) => ({ type: 'USER_SIGNUP', formDate }),
  signIn: (formDate) => ({ type: 'USER_SIGNIN', formDate })
}

export const signInAction = (formData) => async (dispatch) => {
  try {
    const { data } = await authApi.signIn(formData)
    console.log(data);
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