import React, { useState } from "react";
import CustomButton from "../../../../common/components/CustomButton";
import FloatingButton from "../../../../common/components/FloatingButton";
import Select from "react-select";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";
import {
    deleteObjectById,
    updateOrAdd,
    generateOptions,
    CONSTANTS, NODE_ITEM_TYPES
} from "../../util/common.util";
import { RelationForm } from './RelationForm';

export const NodeItemForm = ({
    initialFormData = {},
    onSave = () => {},
    onCancelEdit = () => {},
}) => {
    const {
        SharedService: { refreshNodes, createNode, updateNodeByUniqueId },
        sharedData: { selectedNode, styles, allNodes },
    } = useSharedConfigurations();

    const [formErrors, setFormErrors] = useState([]);
    const [showRelationForm, setShowRelationForm] = useState(false);
    const [selectedRelation, setSelectedRelation] = useState(null);
    const [formData, setFormData] = useState({
        uniqueId: initialFormData.uniqueId || "",
        name: initialFormData.name || "",
        relations: initialFormData.relations || [],
        itemType: initialFormData.itemType || "",
    });

    const nodeItemTypesOptions = generateOptions(NODE_ITEM_TYPES);

    const validateForm = () => {
        const errors = [];
        if (!formData.name.trim()) errors.push("Name is required");
        if (!formData.itemType.trim()) errors.push("Node Item Type is required");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const updatedNodeItemObj = {
            ...formData,
            relations: formData.relations.map((det) =>
                det.uniqueId.startsWith(CONSTANTS.DRAFT_RELATION_ID_PREFIX)
                    ? { ...det, uniqueId: "" }
                    : det
            ),
        };

        const action = formData.uniqueId
            ? updateNodeByUniqueId(formData.uniqueId, updatedNodeItemObj)
            : createNode(updatedNodeItemObj);

        action.then(() => {
            if (formData.uniqueId) setFormData(selectedNode);
            else refreshNodes();
            onSave();
        });
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRelationEdit = (det = null) => {
        setSelectedRelation(det ? { ...det } : null);
        setShowRelationForm(true);
    };

    const handleRelationDelete = (uniqueId) => {
        setFormData((prevData) => ({
            ...prevData,
            relations: deleteObjectById(prevData.relations, uniqueId),
        }));
    };

    const mergeRelation = (detailData) => {
        setFormData((prevData) => ({
            ...prevData,
            relations: updateOrAdd(prevData.relations, detailData),
        }));
        setShowRelationForm(false);
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

    return (
        <div style={{ ...styles.greenBorder, fontSize: "12px" }}>
            <h3>{formData.uniqueId ? "Edit" : "Add"}</h3>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                <label htmlFor="name" style={{ fontWeight: "bold" }}>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: "90%" }}
                />
            </div>

            <div style={{ padding: "10px" }}>
                <label htmlFor="itemType" style={{ fontWeight: "bold" }}>Select Item Type:</label>
                <Select
                    name="itemType"
                    options={nodeItemTypesOptions}
                    value={nodeItemTypesOptions.find(opt => opt.value === formData.itemType)}
                    onChange={(selectedOption) => setFormData({ ...formData, itemType: selectedOption.value })}
                    styles={customStyles}
                    menuPortalTarget={document.body}
                />
            </div>

            {formData.uniqueId && (
                <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                    <div>
                        <label style={{ fontWeight: "bold" }} htmlFor="description">Relations:</label>
                        {/* <CustomButton onClick={() => handleRelationEdit()}>Add</CustomButton> */}
                        {showRelationForm && (
                            <RelationForm
                                nodeInfo={{ name: formData.name, uniqueId: formData.uniqueId }}
                                initialFormData={selectedRelation}
                                allNodes={allNodes}
                                onSubmit={mergeRelation}
                                onClose={() => setShowRelationForm(false)}
                            />
                        )}
                    </div>
                    <div>
                        {formData.relations.map(({ uniqueId, name, type }, index) => (
                            <div key={index} style={{ display: "flex", padding: "5px" }}>
                                <div style={{ width: "90%", border: "1px solid #999", borderRadius: "4px" }}>
                                    {`uniqueId: ${uniqueId}, name: ${name}, direction-type: ${type}`}
                                </div>
                                <div style={{ width: "5%", border: "1px solid #999", borderRadius: "4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <FloatingButton floatingChildrenStyle={{ width: "50px", height: "80px" }} showButtonText={false} buttonText={"Actions"} iconName={"FaSettings"}>
                                        {/* <CustomButton style={{ marginTop: "5px" }} title={"Edit"} iconName={"FaEdit"} onClick={() => handleRelationEdit({ uniqueId, name, type })} />
                                        <CustomButton style={{ marginTop: "5px" }} title={"Delete"} iconName={"FaDelete"} onClick={() => handleRelationDelete(uniqueId)} /> */}
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {formErrors.length > 0 && (
                <div style={{ padding: "10px" }}>
                    {formErrors.map((error, index) => (
                        <span key={index} style={{ color: "red" }}>{error}</span>
                    ))}
                </div>
            )}

            <div style={{ display: "block", margin: "10px" }}>
                <CustomButton onClick={handleSubmit}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
            </div>
        </div>
    );
};
