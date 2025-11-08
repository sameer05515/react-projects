import React from 'react';
import DyanmicFormDashboard from './components/DyanmicFormDashboard';

const App = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Dynamic Form Generator
        </h1>
        <DyanmicFormDashboard/>
      </div>
    </div>
  );
};

export default App;
