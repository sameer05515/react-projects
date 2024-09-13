import React, { useEffect, useMemo, useState } from 'react';
import GOLD_RATE from '../../common/constants/goldRate';

// Year selection component
const YearSelect = ({ label, value, onChange, options }) => (
  <div>
    <label>{label}</label>
    <select value={value} onChange={onChange}>
      <option value="">-- Select Year --</option>
      {options}
    </select>
  </div>
);

// Amount input component
const AmountInput = ({ amount, onChange }) => (
  <div>
    <b>Enter Amount:</b>
    <input
      type="text"
      placeholder="Amount"
      value={amount}
      onInput={onChange}
    />
  </div>
);

// Display calculated target amount and formula
const GoldRateDetails = ({ selectedYear, targetYear, targetAmount, formula }) => (
  <div>
    <p>Selected Year: '{selectedYear}'</p>
    <p>Selected Target Year: '{targetYear}'</p>
    <b>Equivalent Target Amount for year {targetYear}: </b>{targetAmount}
    <br />
    <b>Formula: </b> {formula}
  </div>
);

const GoldRateCalculator = () => {
  const goldData = GOLD_RATE.data;

  const [combinedState, setCombinedState] = useState({
    selectedYear: "",
    amount: 1,
    targetAmount: 0,
    selectedTargetYear: "",
    formula: ""
  });

  const yearOptions = useMemo(
    () => goldData.map((data, index) => (
      <option key={index} value={data.year}>
        {data.year}
      </option>
    )),
    [goldData]
  );

  const getPriceForYear = useMemo(
    () => (year) => {
      const data = goldData.find((item) => item.year === year);
      return data ? parseFloat(data.price) : 0;
    },
    [goldData]
  );

  const calculateTargetAmount = useMemo(() => {
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
  }, [combinedState.selectedYear, combinedState.selectedTargetYear, combinedState.amount, getPriceForYear]);

  useEffect(() => {
    if (combinedState.selectedYear && combinedState.selectedTargetYear) {
      setCombinedState((prev) => ({
        ...prev,
        ...calculateTargetAmount
      }));
    }
  }, [combinedState.selectedYear, combinedState.selectedTargetYear, combinedState.amount, calculateTargetAmount]);

  const handleYearChange = (event) => {
    setCombinedState((prev) => ({ ...prev, selectedYear: event.target.value }));
  };

  const handleTargetYearChange = (event) => {
    setCombinedState((prev) => ({ ...prev, selectedTargetYear: event.target.value }));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const myVal = parseFloat(value);
    if (myVal >= 0) {
      setCombinedState((prev) => ({ ...prev, amount: myVal }));
    }
  };

  return (
    <div>
      <pre>{JSON.stringify(combinedState, null, 2)}</pre>
      
      <YearSelect
        label="Select a Year: "
        value={combinedState.selectedYear}
        onChange={handleYearChange}
        options={yearOptions}
      />

      <YearSelect
        label="Select a Target Year: "
        value={combinedState.selectedTargetYear}
        onChange={handleTargetYearChange}
        options={yearOptions}
      />

      <AmountInput amount={combinedState.amount} onChange={handleInputChange} />

      {combinedState.selectedYear && combinedState.selectedTargetYear && (
        <GoldRateDetails
          selectedYear={combinedState.selectedYear}
          targetYear={combinedState.selectedTargetYear}
          targetAmount={combinedState.targetAmount}
          formula={combinedState.formula}
        />
      )}
    </div>
  );
};

export default GoldRateCalculator;
