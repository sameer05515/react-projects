import React from 'react';

const ViewSwitcher = ({ viewList, onChange, selectedView, children }) => {
  return (
    <div>
      <div>
        {viewList.map(view => (
          <label key={view.viewName}>
            <input
              type="radio"
              value={view.viewName}
              checked={selectedView === view.viewName}
              onChange={onChange}
            />
            {view.viewLabel}
          </label>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ViewSwitcher;
