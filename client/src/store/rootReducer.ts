import { combineReducers, Reducer } from "redux";

import { loginReducer } from "&features/demo/login/login.slice";
/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    login: loginReducer,
    // TODO add other reducers
    // The rest of your reducers go here in the following format:
    // ...
    // feature: featureReducer
    // ...
  });

export default createRootReducer;
