import { login, register } from "&api/auth.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "./login.type";

/**
 * Initial state object
 */
const initialState: Login = {
  admin: false,
  email: "",
  isLoggedIn: false,
};

/**
 * Thunks are used to dispatch actions that return functions rather than objects,
 * usually used for making api calls or dispatching async actions.
 * Thunks are dispatched in the same way regular actions are dispatched.
 * A slice can have multiple thunks
 */
const makeLoginApiCall = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  "login/makeLoginApiCallStatus",
  async (body: any, thunkApi) => {
    // Make your API call here
    const response = await login(body);
    if (response.status == 200) {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data);
      return response.data;
    } else {
      alert(response.statusText);
      return response.statusText;
    }
  }
);

const makeRegisterApiCall = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  "login/makeRegisterApiCallStatus",
  async (body: any, thunkApi) => {
    // Make your API call here
    const response = await register(body);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.data);
    return response.data;
  }
);

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const loginSlice = createSlice({
  /**
   * Unique feature name
   */
  name: "login",

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
    setLogin: (state, action) => {
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
    builder
      .addCase(makeLoginApiCall.pending, (state, action) => {
        // Write pending logic here
        console.log(action);
      })
      .addCase(makeLoginApiCall.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.email = action.payload.email;
        state.admin = action.payload.admin;
      })
      .addCase(makeLoginApiCall.rejected, (state, action) => {
        // Write failure logic here
        alert("invalid username or password please try again");
        state.isLoggedIn = false;
      })
      .addCase(makeRegisterApiCall.pending, (state, action) => {
        // Write pending logic here
        console.log(action);
      })
      .addCase(makeRegisterApiCall.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.email = action.payload.email;
      })
      .addCase(makeRegisterApiCall.rejected, (state, action) => {
        // Write failure logic here
        alert("register failed please try again later");
        state.isLoggedIn = false;
      });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const loginReducer = loginSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const loginActions = {
  ...loginSlice.actions,
  makeRegisterApiCall,
  makeLoginApiCall,
};
