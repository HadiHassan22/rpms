import { combineReducers, Reducer } from "redux";

import { loginReducer } from "&features/demo/login/login.slice";
// Import Firebase as well as any extensions. In this case we're just adding on Firestore (our database)
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVu3mEZAf6rLpAwr85XQl9mN0HxKjMS_s",
  authDomain: "firelist-app.firebaseapp.com",
  databaseURL: "https://firelist-app.firebaseio.com",
  projectId: "firelist-app",
  storageBucket: "firelist-app.appspot.com",
  messagingSenderId: "11406901140",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    login: loginReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // TODO add other reducers
    // The rest of your reducers go here in the following format:
    // ...
    // feature: featureReducer
    // ...
  });

export default createRootReducer;
