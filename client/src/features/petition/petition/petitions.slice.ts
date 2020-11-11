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
const addPetition = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  "petition/create",
  async (body: any) => {
    console.log(body);
    Axios.post("api/petition", body).then((response) => {
      return response.data;
    });
  }
);

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
    // Add here reducers
    // ...
  },
  /**
   * Extra reducers are for handling action types.
   * Here thunk actions are handled
   */
  extraReducers: (builder) => {
    // TODO remove extraReducers if there are no thunks
    builder.addCase(addPetition.pending, (state, action) => {
      // Write pending logic here
    });
    builder.addCase(
      addPetition.fulfilled,
      (state, action: { payload: any; type: string }) => {
        state.petitions.push(action.payload);
      }
    );
    builder.addCase(addPetition.rejected, (state, action) => {
      // Write failure logic here
    });
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
  addPetition,
};
