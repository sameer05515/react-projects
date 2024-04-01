import React from 'react';
// import Intl from 'intl';
import 'intl'; // Import the polyfill
import 'intl/locale-data/jsonp/en-US'; // Import the locale data

const CurrencyLabel = ({label=""}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
       
      // use like this:
      
  return (
    <span>{formatter.format(label)}</span>
  )
}

export default CurrencyLabel