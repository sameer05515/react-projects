import React, { useState } from 'react';
import GOLD_RATE from '../../common/goldRate';

const GoldRateCalculator = () => {
  const goldData = GOLD_RATE.data;

  const [selectedYear, setSelectedYear] = useState("");
  const [amount, setAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const [selectedTargetYear, setSelectedTargetYear] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [formula, setFormula] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    calculateTargetAmount();
  };

  const handleTargetYearChange = (event) => {
    setSelectedTargetYear(event.target.value);
    calculateTargetAmount();
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    calculateTargetAmount();
  };

  const yearOptions = goldData.map((data, index) => (
    <option key={index} value={data.year}>
      {data.year}
    </option>
  ));

  const priceOptions = goldData.map((data, index) => (
    <option key={index} value={data.price}>
      {data.price}
    </option>
  ));

  const handleInputChange = (e) => {
    const { value } = e.target;
    const myVal=parseFloat(value);
    setAmount(pre=>myVal);
    calculateTargetAmount();
  };

  const calculateTargetAmount = () => {
    const price = getPriceForYear(selectedYear);
    const targetPrice = getPriceForYear(selectedTargetYear);
    if (price !== 0 && targetPrice !== 0) {
      const tAmount = amount * (targetPrice / price);
      setFormula(`amount * (targetPrice / price) : ${amount} * (${targetPrice} / ${price})`);
      setTargetAmount(tAmount);
    } else {
      setFormula("Invalid selection. Please choose valid years and prices.");
      setTargetAmount(0);
    }
  };

  const getPriceForYear = (year) => {
    const data = goldData.find((item) => item.year === year);
    return data ? parseFloat(data.price) : 0;
  };

  return (
    <div>
      <label>Select a Year: </label>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">-- Select Year --</option>
        {yearOptions}
      </select>

      <label>Select a Target Year: </label>
      <select value={selectedTargetYear} onChange={handleTargetYearChange}>
        <option value="">-- Select Target Year --</option>
        {yearOptions}
      </select>

      <label>Select a Price: </label>
      <select value={selectedPrice} onChange={handlePriceChange}>
        <option value="">-- Select Price --</option>
        {priceOptions}
      </select>

      <div>
        <p>Selected Year: '{selectedYear}'</p>
        <p>Selected Target Year: '{selectedTargetYear}'</p>
        <p>Selected Price: {selectedPrice}</p>
      </div>
      {selectedYear && selectedTargetYear && <div>
        <b>Enter Amount for year {selectedYear}: </b> <input type='text' name="title"
          placeholder="Amount"
          value={amount}
          onChange={handleInputChange}
        //   onBlur={handleInputChange}
        /> <br/>
        <b>Equivalent Target Amount for year {selectedTargetYear}: </b>{targetAmount}
        <br/>
        <b>Formula: </b> {formula}
      </div>}
    </div>
  );
};

export default GoldRateCalculator;
