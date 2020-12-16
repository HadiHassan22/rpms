import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Home } from "./home.type";

/**
 * Initial state object
 */
const initialState: Home = {};

/**
 * Thunks are used to dispatch actions that return functions rather than objects,
 * usually used for making api calls or dispatching async actions.
 * Thunks are dispatched in the same way regular actions are dispatched.
 * A slice can have multiple thunks
 */
const makeHomeApiCall = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  "home/makeHomeApiCallStatus",
  async (request: any) => {
    // Make your API call here
  }
);

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const homeSlice = createSlice({
  /**
   * Unique feature name
   */
  name: "home",

  /**
   * Initial state object
   */
  initialState: initialState,

  /**
   * Reducers are functions that determine changes to an application's state.
   * They can have two forms:
   *
   * 1- Modify the state by providing key-value pairs, ex:
   *
   *    setCounter: (state, action) => {
   *      return { ...state, ...action.payload };
   *    }
   *
   * 2- Apply mutating logic to part of the state.
   *    Note that this is possible using 'Immer', ex:
   *
   *    decrementCounter: (state) => {
   *      state.value -= 1;
   *    }
   */
  reducers: {
    setHome: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
    // Add here reducers
    // ...
  },
  /**
   * Extra reducers are for handling action types.
   * Here thunk actions are handled
   */
  extraReducers: (builder) => {
    // TODO remove extraReducers if there are no thunks
    builder.addCase(makeHomeApiCall.pending, (state, action) => {
      // Write pending logic here
    });
    builder.addCase(makeHomeApiCall.fulfilled, (state, action) => {
      // Write success logic here
    });
    builder.addCase(makeHomeApiCall.rejected, (state, action) => {
      // Write failure logic here
    });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const homeReducer = homeSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const homeActions = { ...homeSlice.actions };
