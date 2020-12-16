import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { Petitions } from "./petitions.type";

/**
 * Initial state object
 */
const initialState: Petitions = { petitions: [] };

/**
 * Thunks are used to dispatch actions that return functions rather than objects,
 * usually used for making api calls or dispatching async actions.
 * Thunks are dispatched in the same way regular actions are dispatched.
 * A slice can have multiple thunks
 */

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const petitionSlice = createSlice({
  /**
   * Unique feature name
   */
  name: "petition",

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
    setPetition: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
    addPetition: (state, action) => {
      state.petitions.push(action.payload);
    },
    acceptPetition: (state, action) => {
      const petition = state.petitions.find(
        (petition) => petition._id === action.payload
      );
      if (petition) {
        petition.status = "accepted";
      }
    },
    rejectPetition: (state, action) => {
      const petition = state.petitions.find(
        (petition) => petition._id === action.payload
      );
      if (petition) {
        petition.status = "rejected";
      }
    },
    // Add here reducers
    // ...
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const petitionReducer = petitionSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const petitionActions = {
  ...petitionSlice.actions,
};
