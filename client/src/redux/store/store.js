import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "../reducers/authReducers";
import EmployeesReducer from "../reducers/employessReducer";
import { getExcelsReducer } from "../reducers/excelReducers";
import { loadingReducer } from "../reducers/loadingReducers";
import createNewOrderReducer from "../reducers/orderReducers";
import { getActiveUsers } from "../reducers/usersReducers";

const rootReducer = combineReducers({
  user: userReducer,
  employees: EmployeesReducer,
  order: createNewOrderReducer,
  activeUsers: getActiveUsers,
  excels: getExcelsReducer,
  isLoading: loadingReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
