import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../common/components/custom-button/CustomButton";
import Details from "./sub-components/details-section/Details";
import Playground from "./sub-components/playground-section/Playground";
import { RelatedNodesBaseStyles as styles } from "./util/RelatedNodesBase.styles";
import {
    SharedConfigurationsProvider,
    useSharedConfigurations,
} from "./util/RelatedNodeUtil";

const customSelectStyles = {
    menu: (provided) => ({
        ...provided,
        maxHeight: "100px",
        overflowY: "auto",
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: "100px",
    }),
};

const containerStyle = {
    ...styles.columnContainer,
    ...styles.greenBorder,
    height: "94vh",
    width: "97vw",
    overflow: "auto",
    margin: "10px 30px",
};

const headerStyle = {
    ...styles.rowContainer,
    flex: 1,
    ...styles.greenBorder,
    width: "100%",
};

const contentStyle = {
    ...styles.rowContainer,
    flex: 10,
    ...styles.greenBorder,
    justifyContent: "space-between",
    width: "100%",
};

const RelatedNodesBase = () => {
    const navigate = useNavigate();

    const {
        SharedService: { refreshNodes, setSelectedNode },
        sharedData: { allNodes },
    } = useSharedConfigurations();

    useEffect(() => {
        refreshNodes();
    }, [refreshNodes]);

    const nodeOptions =
        allNodes?.map((node) => ({ label: node.name, value: node })) || [];

    const handleItemTypeSelect = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
        setSelectedNode(selectedOption.value);
    };

    return (
        <div style={containerStyle}>
            <div>
                Once Node and relations are now being saved/updated/fetched in/from
                database, now we will work to draw graphs with arrows for related nodes.
            </div>
            <div style={headerStyle}>
                RelatedNodesBase <br />
                search, and sorting <br />
                <CustomButton onClick={() => navigate("create")}>Create</CustomButton>
                <CustomButton onClick={() => refreshNodes()}>Refresh</CustomButton>
                <div style={{ padding: "10px" }}>
                    <Select
                        name="itemType"
                        options={nodeOptions}
                        placeholder="Select Node"
                        onChange={handleItemTypeSelect}
                        styles={customSelectStyles}
                        menuPortalTarget={document.body}
                    />
                </div>
            </div>
            <div style={contentStyle}>
                <Playground />
                <Details />
            </div>
        </div>
    );
};

const WithContext = () => (
    <SharedConfigurationsProvider>
        <RelatedNodesBase />
    </SharedConfigurationsProvider>
);

export default WithContext;
