import React, { useState } from 'react';
import CronGenerator from 'react-cron-generator';

type CronProp = {
  onChange: (cronValue: string) => void;
  value: string;
  showResultText: boolean;
  showResultCron: boolean;
};

// Provide minimal typing shim if library types are missing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TypedCronGenerator = CronGenerator as unknown as React.FC<CronProp>;

function CronExpressionGenerator() {
  const [cronExpression, setCronExpression] = useState<string>('0 0 * * *'); // Default expression

  const handleCronChange = (cronValue: string) => {
    setCronExpression(cronValue);
  };

  return (
    <div>
      <h1>Cron Expression Generator</h1>
      <TypedCronGenerator
        onChange={handleCronChange}
        value={cronExpression}
        showResultText={true}
        showResultCron={true}
      />
      <div>
        <h2>Generated Cron Expression:</h2>
        <p>{cronExpression}</p>
      </div>
    </div>
  );
}

export default CronExpressionGenerator;
