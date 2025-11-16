import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../common/components/custom-button/CustomButton";
import Details from "./sub-components/details-section/Details";
import Playground from "./sub-components/playground-section/Playground";
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
        <div className="flex flex-col items-start mt-5 px-5 border border-green-500 h-[94vh] w-[97vw] overflow-auto mx-[30px] my-2.5">
            <div className="mb-4">
                Once Node and relations are now being saved/updated/fetched in/from
                database, now we will work to draw graphs with arrows for related nodes.
            </div>
            <div className="flex flex-row gap-2.5 mt-2.5 border border-green-500 flex-1 w-full">
                RelatedNodesBase <br />
                search, and sorting <br />
                <CustomButton onClick={() => navigate("create")}>Create</CustomButton>
                <CustomButton onClick={() => refreshNodes()}>Refresh</CustomButton>
                <div className="p-2.5">
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
            <div className="flex flex-row gap-2.5 mt-2.5 border border-green-500 flex-[10] justify-between w-full">
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
