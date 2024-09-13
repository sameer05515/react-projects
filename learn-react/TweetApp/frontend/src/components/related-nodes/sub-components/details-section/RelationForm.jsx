import React, { useState, useEffect } from "react";
import CustomButton from "../../../../common/components/CustomButton";
import Select from "react-select";
import JSONPreview from "../common/JSONPreview";
import CustomCheckbox from "../../../../common/components/CustomCheckbox";
import {
    generateOptions,
    RELATION_DIRECTION_TYPES
} from "../../util/common.util";
import {
    getRelationStringForId,
    relationOptions,
} from "../../util/relation-data";
import {
    capitalizeFirstLetter
} from "../../../../common/service/commonService";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";

export const RelationForm = ({
    initialFormData,
    onSubmit = () => {},
    onClose = () => {},
}) => {
    const {
        SharedService: { updateNodeByUniqueId, refreshNodes, updateRelationInConnectedNodes },
        sharedData: { styles, selectedNode: nodeInfo, allNodes },
    } = useSharedConfigurations();
    
    const [formData, setFormData] = useState({
        uniqueId: initialFormData?.uniqueId || "",
        hasId: initialFormData?.hasId || nodeInfo.uniqueId,
        withId: initialFormData?.withId || "",
        name: initialFormData?.name || "",
        showReverseRelationName: initialFormData?.showReverseRelationName || false,
        type: initialFormData?.type || "",
        itemMetadata: initialFormData?.itemMetadata || {},
    });
    
    const [finalString, setFinalString] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        setFinalString(
            getRelationStringForId(
                formData.name,
                getNodeNameForId(formData.hasId),
                getNodeNameForId(formData.withId),
                formData.showReverseRelationName
            )
        );
    }, [formData]);

    const nodeOptions = allNodes
    ?.filter((node) =>
        node.uniqueId !== formData?.hasId &&
        !nodeInfo?.relations?.some(({ hasId, withId }) => hasId === node.uniqueId || withId === node.uniqueId)
    )
    .map((node) => ({
        label: node.name,
        value: node.uniqueId,
    }));

    const getNodeNameForId = (id) => {
        if (!id) return "";
        return allNodes.find((node) => node.uniqueId === id)?.name || "";
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.withId.trim()) errors.push("Please select target node");
        if (!formData.name.trim()) errors.push("Please select relation type");
        if (!formData.type.trim()) errors.push("Please select Direction Type");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const mergeRelation = (detailData) => {
        //const updatedRelations = updateOrAdd(nodeInfo.relations, detailData);
        // nodeInfo.relations = updatedRelations;

        const action = updateRelationInConnectedNodes(detailData);

        action.then(() => {
            refreshNodes();
            onSubmit();
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const detailData = {
            ...formData,
            uniqueId: initialFormData?.uniqueId || ""
            //`${CONSTANTS.DRAFT_RELATION_ID_PREFIX}${getDateAsMillisecondsString()}`,
        };

        mergeRelation(detailData);
    };

    const customStyles = {
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

    if (!nodeInfo.uniqueId)
        return (
            <div>
                Relation could not be established for provided node info:{" "}
                {JSON.stringify(nodeInfo)}
            </div>
        );

    return (
        <div>
            <span>
                {formData.uniqueId ? "Edit" : "Add"}{" "}
                {capitalizeFirstLetter(formData.type)}
            </span>
            <JSONPreview data={formData} />

            <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name" style={{ fontWeight: "bold" }}>
                    Select Relation
                </label>
                <Select
                    name="name"
                    options={relationOptions}
                    value={relationOptions.find((opt) => opt.value === formData.name)}
                    onChange={(option) => handleInputChange("name", option.value)}
                    styles={customStyles}
                    menuPortalTarget={document.body}
                />
            </div>

            <div>
                <CustomCheckbox
                    title="Show reverse relation"
                    onChange={(checked) =>
                        handleInputChange("showReverseRelationName", checked)
                    }
                    initiallySelected={formData.showReverseRelationName}
                />
            </div>

            <div style={{ padding: "10px" }}>
                <label htmlFor="withId" style={{ fontWeight: "bold" }}>
                    Select With Node:
                </label>
                <Select
                    name="withId"
                    options={nodeOptions}
                    value={nodeOptions.find((opt) => opt.value === formData.withId)}
                    onChange={(option) => handleInputChange("withId", option.value)}
                    styles={customStyles}
                    menuPortalTarget={document.body}
                />
            </div>

            <div style={{ padding: "10px" }}>
                <label htmlFor="type" style={{ fontWeight: "bold" }}>
                    Select Direction Type:
                </label>
                <Select
                    name="type"
                    options={generateOptions(RELATION_DIRECTION_TYPES)}
                    value={generateOptions(RELATION_DIRECTION_TYPES).find(
                        (opt) => opt.value === formData.type
                    )}
                    onChange={(option) => handleInputChange("type", option.value)}
                    styles={customStyles}
                    menuPortalTarget={document.body}
                />
            </div>

            {formErrors.length > 0 && (
                <div style={{ padding: "10px" }}>
                    {formErrors.map((error, index) => (
                        <div key={index} style={{ color: "red" }}>
                            {error}
                        </div>
                    ))}
                </div>
            )}

            <div>
                <b>Final output string</b> <br />
                {finalString}
            </div>

            <div style={{ display: "block", margin: "10px" }}>
                <CustomButton onClick={handleSubmit}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onClose}>Cancel</CustomButton>
            </div>
        </div>
    );
};
