import React, { Component } from "react";

import Header from "./Header";
import Optimizer from "./Optimizer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Optimizer />
      </div>
    );
  }
}

export default App;
