const createFeatureTemplate = (name) => {
  const newName = name.replace(/^./, name[0].toUpperCase());
  return {
    componentTemplate: `import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "&store/store";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { ${name}Actions } from "./${name}.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const ${newName}Component = (props: ReduxProps) => {
  /**
   * i18n translation function.
   * Takes namespace/s as params and nothing for default.
   */
  const { t } = useTranslation(["${name}"]); // Make sure namespace is added to locales

  /**
   * useEffect performs side-effects on component rendering.
   * It takes a function for side-effects and a dependency list.
   * When dependency list is empty, useEffect runs each time the component rerenders
   * Adding variables to the dependency list will cause useEffect to run each time a variable changes
   */
  useEffect(() => {
    // Write your side-effects here
  }, []);

  return <div />;
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const ${newName}ComponentRedux = connector(${newName}Component);

export { ${newName}ComponentRedux as ${newName}Component };
`,

    sliceTemplate: `import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ${newName} } from "./${name}.type";

/**
 * Initial state object
 */
const initialState: ${newName} = {};

/**
 * Thunks are used to dispatch actions that return functions rather than objects,
 * usually used for making api calls or dispatching async actions.
 * Thunks are dispatched in the same way regular actions are dispatched.
 * A slice can have multiple thunks
 */
const make${newName}ApiCall = createAsyncThunk(
  // TODO change this method based on usecase
  // You can add as many thunks as required
  // Delete this method if not needed
  "${name}/make${newName}ApiCallStatus",
  async (body: any) => {
    // Make your API call here
  }
);

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const ${name}Slice = createSlice({
  /**
   * Unique feature name
   */
  name: "${name}",

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
    set${newName}: (state, action) => {
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
    builder.addCase(make${newName}ApiCall.pending, (state, action) => {
      // Write pending logic here
    });
    builder.addCase(make${newName}ApiCall.fulfilled, (state, action) => {
      // Write success logic here
    });
    builder.addCase(make${newName}ApiCall.rejected, (state, action) => {
      // Write failure logic here
    });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const ${name}Reducer = ${name}Slice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const ${name}Actions = { ...${name}Slice.actions, make${newName}ApiCall };
`,

    typeTemplate: `/**
 * This interface is for the initial state of the feature slice
 */
export interface ${newName} {
  // Write your type declerations here
}
`,

    i18nTemplate: `/**
 * i18n ${name} namespace
 * Consists of English and arabic translations
 */
export const ${name}NameSpace = {
  en: {
    // Write english key-mapping here
  },
  ar: {
    // Write Arabic key-mapping here
  },
};
`,
  };
};
module.exports = {
  createFeatureTemplate,
};
