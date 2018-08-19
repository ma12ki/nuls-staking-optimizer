import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  const chartData = data.map(item => item.finalStake);
  const labels = data.map(item => String(item.daysBetweenReinvesting));
  const max = Math.max(...chartData);
  const pointRadius = chartData.map(value => (value === max ? 3 : 1));
  const pointColor = chartData.map(
    value => (value === max ? "#74d500" : "#041e4f")
  );

  return (
    <div className="Chart">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Final stake",
              data: chartData,
              fill: false,
              borderWidth: 2,
              borderColor: "#041e4f",
              pointRadius,
              pointBorderColor: pointColor,
              pointBackgroundColor: pointColor,
              pointHoverBackgroundColor: "#bdf502",
              pointHoverBorderColor: "#bdf502"
            }
          ]
        }}
        options={{
          title: {
            display: true,
            text: "Final stake vs days between reinvesting"
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  maxTicksLimit: 10
                },
                scaleLabel: {
                  display: true,
                  labelString: "Days between reinvesting"
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Final stake"
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
