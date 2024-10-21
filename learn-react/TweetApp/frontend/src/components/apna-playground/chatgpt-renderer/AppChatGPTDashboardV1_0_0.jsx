import React, { useEffect, useMemo, useState } from "react";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import { fetchJsonData } from "./util/util";

const AppChatGPTDashboardV1_0_0 = () => {
    const [jsonData, setJsonData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const selectedFile =
        "http://localhost:5000/data/conversations-24-Sep-2024.json";

    const { selectedData } = useMemo(() => {
        let selectedData = null;
        let validJsonData = false;

        if (jsonData && Array.isArray(jsonData) && selectedIndex >= 0) {
            selectedData = jsonData.find((d, idx) => idx === selectedIndex);
        }

        return { selectedData };
    }, [jsonData, selectedIndex]);

    const setNextIndex = (increment) =>
        setSelectedIndex(
            (prev) => (prev + increment + jsonData.length) % jsonData.length
        );

    useEffect(() => {
        setLoading(true);
        fetchJsonData(selectedFile, setJsonData).then(setLoading(false));
    }, [selectedFile]);

    if (loading) {
        return <>Loading .......</>;
    }
    return (
        <div>
            AppChatGPTDashboardV1_0_0
            {jsonData && Array.isArray(jsonData) && jsonData.length > 0 ? (
                <>
                    Data hai: {jsonData.length} <br />
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
                                onClick: () => setSelectedIndex(() => 0),
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
                        title="selectedData"
                    />
                </>
            ) : (
                <>Data me samasya hai</>
            )}
        </div>
    );
};

export default AppChatGPTDashboardV1_0_0;
