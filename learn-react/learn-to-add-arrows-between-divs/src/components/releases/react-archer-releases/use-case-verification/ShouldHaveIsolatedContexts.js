import React from 'react';
import ReactArcherV1 from '../v1.0/ReactArcherApp1.0';

const ReactArcherV1ShouldHaveIsolatedContexts = ({ data = [] }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div style={{ flex: 1, margin: '10px' }}>
        <h1>First Component</h1>
        <ReactArcherV1 data={data} />
      </div>
      <div style={{ flex: 1, margin: '10px' }}>
        <h1>Second Component</h1>
        <ReactArcherV1 data={data[0]?.children || []} />
      </div>
    </div>
  );
}

export default ReactArcherV1ShouldHaveIsolatedContexts;
