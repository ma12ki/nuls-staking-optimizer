import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import lightGreen from "@material-ui/core/colors/lightGreen";

import Header from "./Header";
import Optimizer from "./Optimizer";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: lightGreen
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Optimizer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
