import React from "react";

import Inputs from "./Inputs";
import Chart from "./Chart";
import simulator from "./simulator";
import "./Optimizer.css";

class Optimizer extends React.PureComponent {
  state = {
    data: [],
    max: {}
  };

  handleInputsChange = ({
    stake,
    blockPayout,
    blockTimeMinutes,
    reinvestingFee,
    days
  }) => {
    const data = Array(days)
      .fill(null)
      .map((_, i) => i + 1)
      .map(daysBetweenReinvesting => ({
        daysBetweenReinvesting,
        finalStake: simulator({
          stake,
          blockPayout,
          blockTimeMinutes,
          reinvestingFee,
          days,
          daysBetweenReinvesting
        })
      }));

    const max = data.reduce(
      (highest, item) => {
        if (item.finalStake > highest.finalStake) {
          return item;
        }
        return highest;
      },
      { finalStake: 0 }
    );

    this.setState({ data, max });
  };

  render() {
    const { max } = this.state;

    return (
      <main className="Optimizer">
        <Inputs onChange={this.handleInputsChange} />
        <div>
          max {max.finalStake} NULS if reinvesting every{" "}
          {max.daysBetweenReinvesting} days
        </div>
        <Chart />
      </main>
    );
  }
}

export default Optimizer;
