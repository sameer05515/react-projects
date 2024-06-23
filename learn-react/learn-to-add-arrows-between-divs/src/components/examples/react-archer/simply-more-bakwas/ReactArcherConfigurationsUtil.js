// useReactArcherConfigurations.js

import React, { createContext, useContext, useState } from 'react';


const initialSharedData={
    showMetaData: false,
    
}

// Create a context for shared Configurations
const SharedConfigurationsContext = createContext();

// Create a provider component
const SharedConfigurationsProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState(initialSharedData);

    const toggleShowMetaData = () => {
        setSharedData(prev=>({...prev, showMetaData: !prev.showMetaData}));
    };

    return (
        <SharedConfigurationsContext.Provider value={{ sharedData, toggleShowMetaData }}>
            {children}
        </SharedConfigurationsContext.Provider>
    );
};

// Custom hook to use shared Configurations
const useSharedConfigurations = () => useContext(SharedConfigurationsContext);

export {useSharedConfigurations, SharedConfigurationsProvider}