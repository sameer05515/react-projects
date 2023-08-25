import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_SUM = gql`
  query GetSum($number1: Float!, $number2: Float!) {
    sum(number1: $number1, number2: $number2)
  }
`;

function SumNumbers() {
  const { loading, error, data } = useQuery(GET_SUM, {
    variables: {
      number1: 5, // Replace with your desired numbers
      number2: 3,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Sum of Two Numbers</h1>
      <p>Number 1: {data.sum.number1}</p>
      <p>Number 2: {data.sum.number2}</p>
      <p>Sum: {data.sum.result}</p>
    </div>
  );
}

export default SumNumbers;
