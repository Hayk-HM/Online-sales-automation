import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "../reducers/authReducers";
import EmployeesReducer from "../reducers/employessReducer";
import createNewOrderReducer from "../reducers/orderReducers";

const rootReducer = combineReducers({
  user: userReducer,
  employees: EmployeesReducer,
  newOrder: createNewOrderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
