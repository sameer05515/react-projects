// SharedDataUseExample.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context for shared data
const SharedDataContext = createContext();

// Create a provider component
const SharedDataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState(null);

    const updateSharedData = (newData) => {
        setSharedData(newData);
    };

    return (
        <SharedDataContext.Provider value={{ sharedData, updateSharedData }}>
            {children}
        </SharedDataContext.Provider>
    );
};

// Custom hook to use shared data
const useSharedData = () => useContext(SharedDataContext);

const componentStyle = {
    padding: "10px",
    border: "1px solid black",
    margin: "50px 0",
};


const ComponentA = () => {
    const { sharedData, updateSharedData } = useSharedData();

    return (
        <div style={componentStyle}>
            <h1>Component A</h1>
            <button onClick={() => updateSharedData(`New Data updated at ${new Date()}`)}>
                Update Shared Data
            </button>
            <p>Shared Data: {sharedData}</p>
        </div>
    );
};

const ComponentB = () => {
    const { sharedData } = useSharedData();

    return (
        <div style={componentStyle}>
            <h1>Component B</h1>
            <p>Shared Data: {sharedData}</p>
        </div>
    );
};

const SharedDataUseExample2 = () => {
    return (
        <SharedDataProvider>
            <div style={componentStyle}>                
                <ComponentA />
                <ComponentB />
            </div>
        </SharedDataProvider>
    );
};

export default SharedDataUseExample2;
