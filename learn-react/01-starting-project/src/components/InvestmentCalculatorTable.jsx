import React from 'react'
import CurrencyLabel from './CurrencyLabel'

const InvestmentCalculatorTable = ({yearlyData=[]}) => {
  return (
    <>
    {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {yearlyData && yearlyData.length > 0
            ? yearlyData.map((data, index) => (
                <>
                  <tr key={index+1}>
                    <td>{index+1}</td>
                    <td> <CurrencyLabel label={data.yearlyInterest}/></td>
                    <td><CurrencyLabel label={data.yearlyInterest}/></td>
                    <td><CurrencyLabel label={data.yearlyInterest}/></td>
                    <td><CurrencyLabel label={data.yearlyInterest}/></td>
                  </tr>
                </>
              ))
            : <tr key={1}><td>"no data is available"</td></tr>}
          {/* <tr>
            <td>YEAR NUMBER</td>
            <td>TOTAL SAVINGS END OF YEAR</td>
            <td>INTEREST GAINED IN YEAR</td>
            <td>TOTAL INTEREST GAINED</td>
            <td>TOTAL INVESTED CAPITAL</td>
          </tr> */}
        </tbody>
      </table>
    </>
  )
}

export default InvestmentCalculatorTable