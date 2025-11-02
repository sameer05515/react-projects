import React, { useState, useEffect } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import Select from "react-select";
import JSONPreview from "../common/JSONPreview";
import CustomCheckbox from "../../../../common/components/custom-checkbox/CustomCheckbox";
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

            <div className="flex flex-col mb-4">
                <label htmlFor="name" className="font-bold mb-2">
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

            <div className="mb-4">
                <CustomCheckbox
                    title="Show reverse relation"
                    onChange={(checked) =>
                        handleInputChange("showReverseRelationName", checked)
                    }
                    initiallySelected={formData.showReverseRelationName}
                />
            </div>

            <div className="p-2.5 mb-4">
                <label htmlFor="withId" className="font-bold block mb-2">
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

            <div className="p-2.5 mb-4">
                <label htmlFor="type" className="font-bold block mb-2">
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
                <div className="p-2.5 mb-4">
                    {formErrors.map((error, index) => (
                        <div key={index} className="text-red-600 text-sm">
                            {error}
                        </div>
                    ))}
                </div>
            )}

            <div className="mb-4">
                <b>Final output string</b> <br />
                {finalString}
            </div>

            <div className="block my-2.5 mx-2.5 flex gap-2">
                <CustomButton onClick={handleSubmit}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onClose}>Cancel</CustomButton>
            </div>
        </div>
    );
};
