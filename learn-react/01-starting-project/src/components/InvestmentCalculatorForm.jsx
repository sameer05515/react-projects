import React, { useState } from "react";

const InvestmentCalculatorForm = ({
    initialObj = {
        currentSavings: 10000,
        yearlyContribution: 1200,
        expectedReturn: 5,
        duration: 15,
    },
    onSubmit = () => { },
    onReset = () => { },
}) => {

    const [formData, setFormData] = useState({
        ...initialObj,
    });

    const handleChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const reset = () => {
        setFormData((prev) => ({
            ...initialObj,
        }));
        onReset([]);
    };

    const calculateHandler = (event, userInput) => {
        // Should be triggered when form is submitted
        // You might not directly want to bind it to the submit event on the form though...

        // event.preventDefault();
        const yearlyData = []; // per-year results

        // let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
        // const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
        // const expectedReturn = +userInput['expected-return'] / 100;
        // const duration = +userInput['duration'];

        let currentSavings = +formData.currentSavings; // feel free to change the shape of this input object!
        const yearlyContribution = +formData.yearlyContribution; // as mentioned: feel free to change the shape...
        const expectedReturn = +formData.expectedReturn / 100;
        const duration = +formData.duration;

        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
                // feel free to change the shape of the data pushed to the array!
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
            });
        }

        onSubmit(yearlyData);

        // setYearlyData((prev) => [...yearlyData]);

        // do something with yearlyData ...
    };
    return (
        <>
            {/* <pre>initialObj: {JSON.stringify(initialObj, null, 2)}</pre>
            <pre>formData : {JSON.stringify(formData, null, 2)}</pre> */}
            <div className="form">
                <div className="input-group">
                    <p>
                        <label htmlFor="current-savings">Current Savings ($)</label>
                        <input
                            type="number"
                            id="current-savings"
                            name="currentSavings"
                            value={formData.currentSavings}
                            onChange={(e) => handleChangeHandler(e)}
                        />
                    </p>
                    <p>
                        <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                        <input
                            type="number"
                            id="yearly-contribution"
                            name="yearlyContribution"
                            value={formData.yearlyContribution}
                            onChange={(e) => handleChangeHandler(e)}
                        />
                    </p>
                </div>
                <div className="input-group">
                    <p>
                        <label htmlFor="expected-return">
                            Expected Interest (%, per year)
                        </label>
                        <input
                            type="number"
                            id="expected-return"
                            name="expectedReturn"
                            value={formData.expectedReturn}
                            onChange={(e) => handleChangeHandler(e)}
                        />
                    </p>
                    <p>
                        <label htmlFor="duration">Investment Duration (years)</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={(e) => handleChangeHandler(e)}
                        />
                    </p>
                </div>
                <p className="actions">
                    <button type="reset" className="buttonAlt" onClick={reset}>
                        Reset
                    </button>
                    <button type="submit" className="button" onClick={calculateHandler}>
                        Calculate
                    </button>
                </p>
            </div>
        </>
    );
};

export default InvestmentCalculatorForm;
