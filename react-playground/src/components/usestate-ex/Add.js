import React, { useState } from 'react'

function Add() {
  const [numbers, setNumbers] = useState({
    firstNumber: 0,
    secondNumber: 0,
    sum: 0
  });

  const handleChange = (event) => {
    setNumbers({ ...numbers, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // addContact(contactInfo);
    // setContactInfo({ name: "", email: "", phonenumber: "" });
    setNumbers({ ...numbers, sum: (+numbers.firstNumber) + (+numbers.secondNumber) });
  };

  return (
    <div>
      <input type="text" name="firstNumber" value={numbers.firstNumber} onChange={handleChange} />
      <input type="text" name="secondNumber" value={numbers.secondNumber} onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
      <h2>{JSON.stringify(numbers)}</h2>
    </div>
  )
}

export default Add