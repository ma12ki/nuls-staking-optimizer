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
    const maxDays = data.length - 1;

    return (
      <main className="Optimizer">
        <div className="Optimizer-title">
          This calculator helps you answer the question:{" "}
          <span className="Optimizer-question">
            "How often do I reinvest my staking gains to maximize profit?".
          </span>
        </div>
        <Inputs onChange={this.handleInputsChange} />
        <div className="Optimizer-result">
          Max <span className="Optimizer-result-value">{max.finalStake}</span>{" "}
          NULS after <span className="Optimizer-result-value">{maxDays}</span>{" "}
          days if reinvesting every{" "}
          <span className="Optimizer-result-value">
            {max.daysBetweenReinvesting}
          </span>{" "}
          days
        </div>
        <Chart data={data} />
      </main>
    );
  }
}

export default Optimizer;
