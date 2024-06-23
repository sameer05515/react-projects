import React, { useEffect, useState } from 'react';
import GOLD_RATE from '../../common/goldRate';

const GoldRateCalculator = () => {
  const goldData = GOLD_RATE.data;

  const [combinedState, setCombinedState] = useState({
    selectedYear: "",
    amount: 1,
    targetAmount: 0,
    selectedTargetYear: "",
    formula: ""
  });

  useEffect(() => {
    if (combinedState.selectedYear && combinedState.selectedTargetYear) {
      const calculatedObj = calculateTargetAmount();
      setCombinedState(pre => ({ ...pre, ...calculatedObj }));
    }
  }, [combinedState.selectedYear, combinedState.selectedTargetYear, combinedState.amount]);

  const handleYearChange = (event) => {
    setCombinedState(pre => ({ ...pre, selectedYear: event.target.value }));
  };

  const handleTargetYearChange = (event) => {
    setCombinedState(pre => ({ ...pre, selectedTargetYear: event.target.value }));
  };

  const yearOptions = goldData.map((data, index) => (
    <option key={index} value={data.year}>
      {data.year}
    </option>
  ));

  const handleInputChange = (e) => {
    const { value } = e.target;
    const myVal = parseFloat(value);
    if (myVal >= 0) {
      setCombinedState(pre => ({ ...pre, amount: myVal }));
    }
  };

  const calculateTargetAmount = () => {
    const price = getPriceForYear(combinedState.selectedYear);
    const targetPrice = getPriceForYear(combinedState.selectedTargetYear);
    if (price !== 0 && targetPrice !== 0) {
      const tAmount = combinedState.amount * (targetPrice / price);
      const calFormula = `amount * (targetPrice / price) : ${combinedState.amount} * (${targetPrice} / ${price})`;
      return { formula: calFormula, targetAmount: tAmount };
    } else {
      const calFormula = "Invalid selection. Please choose valid years and prices.";
      return { formula: calFormula, targetAmount: 0 };
    }
  };

  const getPriceForYear = (year) => {
    const data = goldData.find((item) => item.year === year);
    return data ? parseFloat(data.price) : 0;
  };

  return (
    <div>
      <pre>{JSON.stringify(combinedState, null, 2)}</pre>
      <label>Select a Year: </label>
      <select value={combinedState.selectedYear} onChange={handleYearChange}>
        <option value="">-- Select Year --</option>
        {yearOptions}
      </select>

      <label>Select a Target Year: </label>
      <select value={combinedState.selectedTargetYear} onChange={handleTargetYearChange}>
        <option value="">-- Select Target Year --</option>
        {yearOptions}
      </select>

      <div>
        <p>Selected Year: '{combinedState.selectedYear}'</p>
        <p>Selected Target Year: '{combinedState.selectedTargetYear}'</p>
        <p>Selected Price: {combinedState.amount}</p>
      </div>
      {combinedState.selectedYear && combinedState.selectedTargetYear && <div>
        <b> Enter Amount for year {combinedState.selectedYear}: </b>
        <input type='text' name="title"
          placeholder="Amount"
          value={combinedState.amount}
          onInput={event => handleInputChange(event)} />
        <br />
        <b>Equivalent Target Amount for year {combinedState.selectedTargetYear}: </b>{combinedState.targetAmount}
        <br />
        <b>Formula: </b> {combinedState.formula}
      </div>}
    </div>
  );
};

export default GoldRateCalculator;
