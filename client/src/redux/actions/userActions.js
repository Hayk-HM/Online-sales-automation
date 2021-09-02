export const userActions = {
  setUser: (formDate) => ({ type: 'SET_USER_INFORMATION', payload: formDate }),
  getActiveUsers: (formData) => ({ type: 'GET_ACTIVE_USERS', payload: formData })
}

