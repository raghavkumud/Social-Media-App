import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createTheme, ThemeProvider } from "@mui/material";
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", '"Seoge UI"'].join(","),
  },
  link: {
    fontFamily: ["Poppins", '"Seoge UI"'].join(","),
    fontWeight: '500',
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
