import React, { useEffect, useMemo, useState, useCallback } from "react";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import { fetchJsonData } from "./util/util";

const selectedFile =
    "http://localhost:5000/data/conversations-24-Sep-2024.json";

const AppChatGPTDashboardV1_0_0 = () => {
    const [jsonData, setJsonData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0); // Default to first item instead of -1
    const [loading, setLoading] = useState(true); // Initially true until data is fetched

    // Memoize selectedData based on jsonData and selectedIndex
    const selectedData = useMemo(() => {
        if (Array.isArray(jsonData) && jsonData.length > 0 && selectedIndex >= 0) {
            return jsonData[selectedIndex];
        }
        return null;
    }, [jsonData, selectedIndex]);

    // Memoized handler to set the next/prev index
    const setNextIndex = useCallback(
        (increment) => {
            setSelectedIndex(
                (prev) => (prev + increment + jsonData.length) % jsonData.length
            );
        },
        [jsonData]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchJsonData(selectedFile, setJsonData);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false once data is fetched
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <>Loading .......</>;
    }

    return (
        <div>
            <h1>AppChatGPTDashboardV1_0_0</h1>
            {Array.isArray(jsonData) && jsonData.length > 0 ? (
                <>
                    <p>Data available: {jsonData.length} items</p>
                    <ButtonGroup
                        options={[
                            {
                                id: 1,
                                children: "Prev",
                                onClick: () => setNextIndex(-1),
                            },
                            {
                                id: 2,
                                children: "Reset",
                                onClick: () => setSelectedIndex(0),
                            },
                            {
                                id: 3,
                                children: "Next",
                                onClick: () => setNextIndex(1),
                            },
                        ]}
                    />
                    <br />
                    <JSONDataViewer
                        metadata={{ selectedIndex, selectedData }}
                        title="Selected Data"
                    />
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default AppChatGPTDashboardV1_0_0;
