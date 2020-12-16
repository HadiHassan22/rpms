import i18n from "&config/i18n";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { history, persistor, store } from "./store/store";

ReactDOM.render(
  // <React.StrictMode>
  /* Links store to redux store */
  <Provider store={store}>
    {/* Persists redux store using imported persistor */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Configures i18n */}
      <I18nextProvider i18n={i18n}>
        {/* App main entry, passes history for propper navigation */}
        <App history={history} />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your store to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
