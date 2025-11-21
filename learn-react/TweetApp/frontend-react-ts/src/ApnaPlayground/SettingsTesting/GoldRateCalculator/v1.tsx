import React, { useEffect, useMemo, useState } from 'react';
import GOLD_RATE from '../../../common/constants/goldRate';

// Year selection component
const YearSelect = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-2 text-gray-700">{label}</label>
    <select 
      value={value} 
      onChange={onChange}
      className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select Year --</option>
      {options}
    </select>
  </div>
);

// Amount input component
const AmountInput = ({ amount, onChange }) => (
  <div className="mb-4">
    <b className="block font-semibold mb-2 text-gray-700">Enter Amount:</b>
    <input
      type="text"
      placeholder="Amount"
      value={amount}
      onInput={onChange}
      className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Display calculated target amount and formula
const GoldRateDetails = ({ selectedYear, targetYear, targetAmount, formula }) => (
  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <p className="mb-2 text-gray-700"><strong>Selected Year:</strong> <span className="text-blue-700">{selectedYear}</span></p>
    <p className="mb-2 text-gray-700"><strong>Selected Target Year:</strong> <span className="text-blue-700">{targetYear}</span></p>
    <p className="mb-2 text-lg">
      <strong className="text-gray-700">Equivalent Target Amount for year {targetYear}:</strong> 
      <span className="text-green-700 font-bold ml-2">{targetAmount.toFixed(2)}</span>
    </p>
    <p className="text-sm text-gray-600">
      <strong>Formula:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{formula}</code>
    </p>
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
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-blue-900">Gold Rate Calculator</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <pre className="text-xs overflow-auto">{JSON.stringify(combinedState, null, 2)}</pre>
      </div>
      
      <div className="space-y-4">
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
    </div>
  );
};

export default GoldRateCalculator;
