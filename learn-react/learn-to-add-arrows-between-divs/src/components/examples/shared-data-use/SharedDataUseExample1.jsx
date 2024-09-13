import { useState } from 'react';

const useSharedData = () => {
    // Initialize state with a default value
    const [sharedData, setSharedData] = useState(null);

    // Function to update the shared data
    const updateSharedData = (newData) => {
        setSharedData(newData);
    };

    // Return the state and the update function
    return {
        sharedData,
        updateSharedData
    };
};

const componentStyle= {
    padding: "10px",
    border: "1px solid black",
    margin: "50px 0",
}
// export default useSharedData;

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

const SharedDataUseExample1 = () => {
    return (
        <div style={componentStyle}>
            <ComponentA />
            <ComponentB />
        </div>
    );
};

export default SharedDataUseExample1;
