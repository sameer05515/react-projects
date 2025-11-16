import React, { useState } from 'react';
import CronGenerator from 'react-cron-generator';

function CronExpressionGenerator() {
  const [cronExpression, setCronExpression] = useState('0 0 * * *'); // Default expression

  const handleCronChange = (cronValue) => {
    setCronExpression(cronValue);
  };

  return (
    <div>
      <h1>Cron Expression Generator</h1>
      <CronGenerator onChange={handleCronChange} value={cronExpression} />
      <div>
        <h2>Generated Cron Expression:</h2>
        <p>{cronExpression}</p>
      </div>
    </div>
  );
}

export default CronExpressionGenerator;
