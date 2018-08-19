import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  const chartData = data.map(item => item.finalStake);
  const labels = data.map(item => String(item.daysBetweenReinvesting));
  const max = Math.max(...chartData);
  const pointRadius = chartData.map(value => (value === max ? 5 : 0));
  const pointBorderColor = chartData.map(
    value => (value === max ? "#74d500" : "")
  );
  const pointBackgroundColor = chartData.map(
    value => (value === max ? "#74d500" : "")
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
              fill: true,
              //   backgroundColor: "rgba(4,30,79,0.3)",
              backgroundColor: "rgba(116,213,0,0.4)",
              borderWidth: 3,
              borderColor: "#041e4f",
              pointRadius,
              pointBorderColor,
              pointBackgroundColor,
              pointHoverRadius: 5,
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
