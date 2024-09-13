import React, { useEffect, useMemo, useState, useCallback } from "react";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import { fetchJsonData } from "./util/util";
import Tree from "../../../common/components/tree-viewer/TreeViewer";

const selectedFile =
    "http://localhost:5000/data/conversations-24-Sep-2024.json";

const AppChatGPTDashboardV1_0_0 = () => {
    const [jsonData, setJsonData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const selectedData = useMemo(
        () => jsonData[selectedIndex] || null,
        [jsonData, selectedIndex]
    );

    const setNextIndex = useCallback(
        (increment) => {
            setSelectedIndex(
                (prev) => (prev + increment + jsonData.length) % jsonData.length
            );
        },
        [jsonData.length]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await fetchJsonData(selectedFile, setJsonData);
            } catch (error) {
                console.error("Error fetching JSON data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <>Loading .......</>;

    if (!jsonData.length) return <p>No data available</p>;

    return (
        <div>
            <h1>AppChatGPTDashboardV1_0_0</h1>
            <p>Data available: {jsonData.length} items</p>
            <ButtonGroup
                options={[
                    { id: 1, children: "Prev", onClick: () => setNextIndex(-1) },
                    { id: 2, children: "Reset", onClick: () => setSelectedIndex(0) },
                    { id: 3, children: "Next", onClick: () => setNextIndex(1) },
                ]}
            />
            <br />
            <JSONDataViewer
                metadata={{ selectedIndex, selectedData }}
                title="Selected Data"
                initialValueToShowMetadata={true}
            />

            <Tree data={jsonData} />
        </div>
    );
};

export default AppChatGPTDashboardV1_0_0;
