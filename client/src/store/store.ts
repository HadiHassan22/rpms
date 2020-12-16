import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import createRootReducer from "./rootReducer";

/**
 * Browser history context used for routing
 */
const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  /** Browser History */
  history: createHashHistory({ hashType: "slash", basename: "/" }),

  /** Reducer key */
  routerReducerKey: "router",

  /** Save upto n previous locations (usefull for redirecetion after login) */
  savePreviousLocations: 3,

  // ... other options if needed
});

/**
 * Redux-persist configuration
 */
const persistConfig = {
  key: "root",
  version: 1,

  /** This could be any storage : AsyncStorage, WebStorage, etc... */
  storage,

  /** Reducers that to be persisted in storage */
  whitelist: ["login"],

  /** Reducers that should not be persisted */
  blacklist: ["router"],
};

/**
 * Redux-toolkit middlewares array
 */
const middleware = [
  /** Default middle ware with serializable-check to support redux-persist */
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

  /** Router middleware */
  routerMiddleware,
];

/**
 * Persists the combined reduxers using provided persist configuration
 */
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(routerReducer)
);

const store = configureStore({
  /** Combined reducers or reducers object */
  reducer: persistedReducer,

  /** Middlewares object*/
  middleware,

  /**
   * Enables devtools for redux.
   * TODO !important: remove this in production mode
   */
  devTools: true,
});

let persistor = persistStore(store);
const history = createReduxHistory(store);

export { history, store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
