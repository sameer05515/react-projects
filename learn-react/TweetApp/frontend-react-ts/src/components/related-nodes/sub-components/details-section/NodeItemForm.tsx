import React, { useState } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import FloatingButton from "../../../../common/components/floating-button/FloatingButton";
import Select from "react-select";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";
import {
    updateOrAdd,
    generateOptions,
    CONSTANTS, NODE_ITEM_TYPES
} from "../../util/common.util";
import { RelationForm } from './RelationForm';

export const NodeItemForm = ({
    initialFormData = {} as any,
    onSave = () => {},
    onCancelEdit = () => {},
}: {
    initialFormData?: any;
    onSave?: () => void;
    onCancelEdit?: () => void;
}) => {
    const {
        SharedService: { refreshNodes, createNode, updateNodeByUniqueId },
        sharedData: { selectedNode, allNodes },
    } = useSharedConfigurations();

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [showRelationForm, setShowRelationForm] = useState(false);
    const selectedRelation = null; // Reserved for future edit relation functionality
    const [formData, setFormData] = useState({
        uniqueId: (initialFormData as any)?.uniqueId || "",
        name: (initialFormData as any)?.name || "",
        relations: (initialFormData as any)?.relations || [],
        itemType: (initialFormData as any)?.itemType || "",
    });

    const nodeItemTypesOptions = generateOptions(NODE_ITEM_TYPES);

    const validateForm = () => {
        const errors: string[] = [];
        if (!formData.name.trim()) errors.push("Name is required");
        if (!formData.itemType.trim()) errors.push("Node Item Type is required");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = () => {
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

    const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const mergeRelation = (detailData: any) => {
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
        <div className="border border-green-500 text-xs">
            <h3 className="text-lg font-semibold mb-4">{formData.uniqueId ? "Edit" : "Add"}</h3>
            <div className="flex flex-col p-2.5">
                <label htmlFor="name" className="font-bold mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="p-2.5">
                <label htmlFor="itemType" className="font-bold block mb-2">Select Item Type:</label>
                <Select
                    name="itemType"
                    options={nodeItemTypesOptions}
                    value={nodeItemTypesOptions.find(opt => opt.value === formData.itemType)}
                    onChange={(selectedOption) => setFormData({ ...formData, itemType: (selectedOption as any)?.value || "" })}
                    styles={customStyles}
                    menuPortalTarget={document.body}
                />
            </div>

            {formData.uniqueId && (
                <div className="flex flex-col p-2.5">
                    <div>
                        <label className="font-bold block mb-2" htmlFor="description">Relations:</label>
                        {showRelationForm && (
                            <RelationForm
                                initialFormData={selectedRelation}
                                onSubmit={() => {}}
                                onClose={() => setShowRelationForm(false)}
                            />
                        )}
                    </div>
                    <div>
                        {formData.relations.map(({ uniqueId, name, type }, index) => (
                            <div key={index} className="flex p-1.5 mb-2">
                                <div className="w-[90%] border border-gray-600 rounded p-2">
                                    {`uniqueId: ${uniqueId}, name: ${name}, direction-type: ${type}`}
                                </div>
                                <div className="w-[5%] border border-gray-600 rounded flex justify-center items-center">
                                    <FloatingButton
                                        panelClassName="h-20 w-12"
                                        buttonClassName="bg-gray-200 border border-gray-400 text-[10px] px-1 py-0.5"
                                        showButtonText={false}
                                        buttonText={"Actions"}
                                        iconName={"FaSettings"}
                                    >
                                        <div />
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {formErrors.length > 0 && (
                <div className="p-2.5">
                    {formErrors.map((error, index) => (
                        <span key={index} className="block text-red-600 text-sm mt-1.5">{error}</span>
                    ))}
                </div>
            )}

            <div className="block my-2.5 mx-2.5 flex gap-2">
                <CustomButton onClick={handleSubmit}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
            </div>
        </div>
    );
};
