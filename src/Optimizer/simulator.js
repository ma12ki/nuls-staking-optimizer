const minutesInDay = 24 * 60;

const simulator = ({
  stake,
  blockPayout,
  blockTimeMinutes,
  reinvestingFee,
  days,
  daysBetweenReinvesting
}) => {
  let payoutPerDay = (minutesInDay / blockTimeMinutes) * blockPayout;
  let dividend = 0;

  for (let day = 0; day < days; day++) {
    dividend += payoutPerDay;

    if (day % daysBetweenReinvesting === 0) {
      const oldStake = stake;
      stake += dividend - reinvestingFee;
      dividend = 0;
      payoutPerDay = payoutPerDay * (stake / oldStake);
    }
  }

  return +(stake + dividend).toFixed(2);
};

export default simulator;
