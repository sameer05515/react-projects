import React, { useState } from "react";
import InvestmentCalculatorForm from "./InvestmentCalculatorForm";
import InvestmentCalculatorTable from "./InvestmentCalculatorTable";

const InvestmentCalculatorBase = ({ logo }) => {
  const initialObj= {
    currentSavings: 10000,
    yearlyContribution: 1200,
    expectedReturn: 5,
    duration: 15,
  };

  const [yearlyData, setYearlyData] = useState([]);

  const reset= (yearlyData)=>{
    setYearlyData((prev) => [...yearlyData]);
  }

  const calculateHandler = (yearlyData) => {
    setYearlyData((prev) => [...yearlyData]);
  };

  
  return (
    <div>
      
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <InvestmentCalculatorForm initialObj={initialObj} onSubmit={calculateHandler} onReset={reset}/>

      <InvestmentCalculatorTable yearlyData={yearlyData}/>
    </div>
  );
};

export default InvestmentCalculatorBase;
