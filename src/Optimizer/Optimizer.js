import React from "react";

import Inputs from "./Inputs";
import defaultInputValues from "./defaultInputValues";
import "./Optimizer.css";

class Optimizer extends React.PureComponent {
  state = {
    inputValues: defaultInputValues
  };

  handleInputsChange = inputValues => this.setState({ inputValues });

  render() {
    return (
      <main className="Optimizer">
        <Inputs onChange={this.handleInputsChange} />
      </main>
    );
  }
}

export default Optimizer;
