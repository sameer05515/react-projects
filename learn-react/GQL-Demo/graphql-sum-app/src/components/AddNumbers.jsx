import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import client from '../common/apollo'; // Import the Apollo Client instance

const GET_SUM = gql`
  query GetSum($number1: Float!, $number2: Float!) {
    sum(number1: $number1, number2: $number2)
  }
`;

function AddNumbers() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sum, setSum] = useState('');
//   const client = useApolloClient();

  const handleNumber1Change = (e) => {
    setNumber1(e.target.value);
  }

  const handleNumber2Change = (e) => {
    setNumber2(e.target.value);
  }

  const handleAddNumbers = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (!isNaN(num1) && !isNaN(num2)) {
      client
        .query({
          query: GET_SUM,
          variables: {
            number1: num1,
            number2: num2,
          },
        })
        .then((response) => {
          setSum(response.data.sum);
        })
        .catch((error) => {
          console.error('Error:', error);
          setSum('Error calculating sum');
        });
    } else {
      setSum('Invalid Input');
    }
  }

  return (
    <div>
      <h1>Add Two Numbers</h1>
      <input
        type="text"
        placeholder="Enter number 1"
        value={number1}
        onChange={handleNumber1Change}
      />
      <input
        type="text"
        placeholder="Enter number 2"
        value={number2}
        onChange={handleNumber2Change}
      />
      <button onClick={handleAddNumbers}>Add</button>
      <p>Sum: {sum}</p>
    </div>
  );
}

export default AddNumbers;
