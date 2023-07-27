import React, { useEffect, useState } from 'react';
import SilverBarChart from './SilverBarChart';

const MyComponent = () => {
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/silver-data.json');
                console.log(response);
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {
                jsonData ?
                    (<>
                        <h1>Silver Price Bar Chart</h1>
                        <SilverBarChart data={jsonData} />
                    </>) : (
                        <p>Loading JSON data...</p>
                    )
            }

        </div>
    );
};

export default MyComponent;
