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
    const data = Array(days + 1)
      .fill(null)
      .map((_, i) => i)
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
    const { data, max } = this.state;

    return (
      <main className="Optimizer">
        <div className="Optimizer-title">
          This calculator helps you answer the question:{" "}
          <span className="Optimizer-question">
            "How often do I reinvest my staking gains to maximize profit?".
          </span>
        </div>
        <Inputs onChange={this.handleInputsChange} />
        <div>
          max {max.finalStake} NULS if reinvesting every{" "}
          {max.daysBetweenReinvesting} days
        </div>
        <Chart data={data} />
      </main>
    );
  }
}

export default Optimizer;
