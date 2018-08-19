import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  const chartData = data.map(item => item.finalStake);
  const labels = data.map(item => String(item.daysBetweenReinvesting));

  return (
    <div className="Chart">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "# of days between reinvesting",
              data: chartData,
              borderWidth: 3
            }
          ]
        }}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  stepSize: 10
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      daysBetweenReinvesting: PropTypes.number.isRequired,
      finalStake: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Chart;
