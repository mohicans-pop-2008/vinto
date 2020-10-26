import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { StylesProvider } from "@material-ui/core/styles";
import App from "./App";
import store from "./store";

render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </Provider>,
  document.getElementById("root")
);
