import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";
import Select from "react-select";
import { getDateAsMillisecondsString } from "../../common/service/commonService";
import CustomButton from "../../common/components/custom-button/CustomButton";
import FloatingButton from "../../common/components/floating-button/FloatingButton";
import HoverableSpan from "../../common/components/hoverable-span/HoverableSpan";
import Popup from "../../common/components/custom-popup/Popup";
import RadioButtonsComponent from "../../common/components/radiobutton-component/RadioButtonsComponent";
import {
    SmartEditor,
    SmartPreviewer,
} from "../../common/components/Smart/Editor/v3";
import { selectAllFlatLinks } from "../../redux/slices/linksSlice";
import { createMemoryMap, updateMemoryMap } from "../../redux/slices/memoryMapSlice";
import {
    selectAllFlatTopics
} from "../../redux/slices/topicSlice";

interface SmartContent {
    content: string;
    textOutputType: string;
    textInputType: string;
}

interface MemoryMapFormData {
    uniqueId: string;
    name: string;
    details: Array<{
        uniqueId?: string;
        smartContent?: SmartContent;
        [key: string]: any;
    }>;
    references: Array<{
        uniqueId?: string;
        itemType?: string;
        itemMetadata?: {
            topicUniqueID?: string;
            linkUniqueID?: string;
            [key: string]: any;
        };
        [key: string]: any;
    }>;
    parentId: string;
}

interface DetailFormData {
    uniqueId: string;
    smartContent: SmartContent;
}

interface ReferenceFormData {
    uniqueId: string;
    itemType: string;
    itemMetadata: {
        topicUniqueID?: string;
        linkUniqueID?: string;
        [key: string]: any;
    };
}

interface SelectOption {
    value: string;
    label: string;
}

export const CreateMemoryMapItem = () => {
    const navigate = useNavigate();
    return (
        <>
            I will show a form to create a memory item
            <MemoryMapForm
                onSave={() => {
                    navigate(-1);
                }}
                onCancelEdit={() => navigate(-1)}
            />
        </>
    );
};

export const EditMemoryMapItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: initialFormData } = location.state || {};
    return (
        <>
            I will show a form to Edit a memory item <br />
            Edit facility for the selected memory map will be available soon!! <br />
            <MemoryMapForm
                initialFormData={initialFormData}
                onSave={() => {
                    navigate(-1);
                }}
                onCancelEdit={() => navigate(-1)}
            />
        </>
    );
};

const deleteObjectById = (arr, uniqueId, idFieldName = "uniqueId") => {
    return arr.filter((obj) => obj[idFieldName] !== uniqueId);
};

const updateOrAdd = (arr, newObj, idFieldName = "uniqueId") => {
    const index = arr.findIndex(
        (obj) => obj[idFieldName] === newObj[idFieldName]
    );

    if (index !== -1) {
        // Update existing object
        arr[index] = newObj;
    } else {
        // Add new object
        arr.push(newObj);
    }

    return arr;
};

const CONSTANTS = {
    DRAFT_REFERENCE_ID_PREFIX: 'DRAFT_REFERENCE_ID_',
    DRAFT_DETAIL_ID_PREFIX: 'DRAFT_DETAIL_ID_'
}

const ITEM_TYPES = {
    TOPIC: "topic",
    SECTION: "section",
    LINK: "link",
    INTERVIEW_QUESTION: "interview-question",
    INTERVIEW_CATEGORY: "interview-category",
};

interface MemoryMapFormProps {
    initialFormData?: Partial<MemoryMapFormData>;
    onSave?: () => void;
    onCancelEdit?: () => void;
}

const MemoryMapForm: React.FC<MemoryMapFormProps> = ({
    initialFormData = {},
    onSave = () => { },
    onCancelEdit = () => { },
}) => {
    const dispatch: AppDispatch = useDispatch();
    const topics = useSelector(selectAllFlatTopics);
    const links = useSelector(selectAllFlatLinks);

    const topicOptions: SelectOption[] = topics.map((t) => ({
        value: t.uniqueId,
        label: t.title,
    }));

    const linkOptions: SelectOption[] = links.map((l) => ({
        value: l.uniqueId,
        label: l.title,
    }));

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [showReferencePopup, setShowReferencePopup] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<DetailFormData | null>(null);
    const [formData, setFormData] = useState<MemoryMapFormData>({
        uniqueId: (initialFormData as any)?.uniqueId || "",
        name: (initialFormData as any)?.name || "",
        details: (initialFormData as any)?.details || [],
        references: (initialFormData as any)?.references || [],
        parentId: (initialFormData as any)?.parentId || "",
    });

    const validateForm = () => {
        const errors: string[] = [];
        if (!formData.name.trim()) errors.push("Name is required");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmitMemoryMap = () => {
        if (!validateForm()) return;

        const updatedMemoryMapObj = {
            ...formData,
            details: [...formData.details?.map(det => ({
                ...det,
                uniqueId: det.uniqueId && !det.uniqueId.startsWith(CONSTANTS.DRAFT_DETAIL_ID_PREFIX) ? det.uniqueId : ''
            }))],
            references: [...formData.references.map(det => ({
                ...det,
                uniqueId: det.uniqueId && !det.uniqueId.startsWith(CONSTANTS.DRAFT_REFERENCE_ID_PREFIX) ? det.uniqueId : ''
            }))],
        };

        setFormData({ ...updatedMemoryMapObj });

        if (formData.uniqueId) {
            dispatch(updateMemoryMap({ ...updatedMemoryMapObj, uniqueId: formData.uniqueId }) as any);
        } else {
            dispatch(createMemoryMap(updatedMemoryMapObj) as any);
        }

        onSave();
    };

    const getTitleCompForRefData = (det: any) => {
        if (!det) return null;

        if (det.itemType === ITEM_TYPES.TOPIC) {
            const topic = topics.find(
                (t) => t.uniqueId === det.itemMetadata.topicUniqueID
            );
            return (
                <HoverableSpan>
                    <b>Topic: </b>
                    {topic?.title}
                </HoverableSpan>
            );
        } else if (det.itemType === ITEM_TYPES.LINK) {
            const link = links.find(
                (l) => l.uniqueId === det.itemMetadata.linkUniqueID
            );
            return (
                <HoverableSpan>
                    <b>Link: </b>
                    {link?.title}
                </HoverableSpan>
            );
        }
        return null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const editDetail = (det: any) => {
        if (!det) return;
        setShowDetailPopup(true);
        setSelectedDetail({ ...det } as DetailFormData);
    };

    const deleteReference = (det: any) => {
        const updatedReferencesArr = deleteObjectById(
            [...formData.references],
            det.uniqueId
        );
        setFormData((prevData) => ({
            ...prevData,
            references: [...updatedReferencesArr],
        }));
    };

    const deleteDetail = (det: any) => {
        const updatedDetaillsArr = deleteObjectById(
            [...formData.details],
            det.uniqueId
        );
        setFormData((prevData) => ({
            ...prevData,
            details: [...updatedDetaillsArr],
        }));
    };

    const mergeDetail = (detailData: DetailFormData) => {
        const updatedDetaillsArr = updateOrAdd([...formData.details], detailData);
        setFormData((prevData) => ({
            ...prevData,
            details: [...updatedDetaillsArr],
        }));
        setShowDetailPopup(false);
    };

    const mergeReference = (referenceData: ReferenceFormData) => {
        const updatedReferencesArr = updateOrAdd(
            [...formData.references],
            referenceData
        );
        setFormData((prevData) => ({
            ...prevData,
            references: [...updatedReferencesArr],
        }));
        setShowReferencePopup(false);
    };

    return (
        <div>
            {showDetailPopup && (
                <DetailPopup
                    initialFormData={selectedDetail || undefined}
                    onSubmit={(data) => mergeDetail(data)}
                    onClose={() => setShowDetailPopup(false)}
                />
            )}

            {showReferencePopup && (
                <ReferencePopup
                    topicOptions={topicOptions}
                    linkOptions={linkOptions}
                    onSubmit={(data) => mergeReference(data)}
                    onClose={() => setShowReferencePopup(false)}
                />
            )}

            <h3 className="text-2xl font-bold mb-4">{formData.uniqueId ? "Edit" : "Add"}</h3>
            <div className="flex items-center p-2.5 mb-4">
                <label htmlFor="name" className="w-[9%] font-bold text-gray-700">
                    Name
                </label>
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

            <div className="block p-2.5 mb-4">
                <div className="mb-2">
                    <label
                        className="w-[9%] font-bold text-gray-700 inline-block"
                        htmlFor="description"
                    >
                        Details:
                    </label>
                    <CustomButton
                        onClick={() => {
                            setSelectedDetail(null);
                            setShowDetailPopup(true);
                        }}
                    >
                        Add
                    </CustomButton>
                </div>
                <div className="space-y-2">
                    {formData.details &&
                        formData.details.map((det, index) => (
                            <div key={index} className="flex p-1">
                                <div className="w-[90%] border border-gray-600 rounded">
                                    {det.smartContent && (
                                        <SmartPreviewer data={det.smartContent} />
                                    )}
                                </div>
                                <div className="w-[5%] border border-gray-600 rounded flex justify-center items-center">
                                    <FloatingButton
                                        panelClassName="h-20 w-16"
                                        buttonClassName="bg-gray-200 border border-gray-400 text-[10px] px-1 py-0.5"
                                        showButtonText={false}
                                        buttonText={"Actions"}
                                        iconName={"FaSettings"}
                                    >
                                        <CustomButton
                                            className="mt-1"
                                            title={"Edit"}
                                            iconName={"FaEdit"}
                                            onClick={() => editDetail(det)}
                                        >
                                            Edit
                                        </CustomButton>
                                        <CustomButton
                                            className="mt-1"
                                            title={"Delete"}
                                            iconName={"FaDelete"}
                                            onClick={() => deleteDetail(det)}
                                        >
                                            Delete
                                        </CustomButton>
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="block p-2.5 mb-4">
                <div className="mb-2">
                    <label
                        className="w-[9%] font-bold text-gray-700 inline-block"
                        htmlFor="description"
                    >
                        References:
                    </label>
                    <CustomButton onClick={() => setShowReferencePopup(true)}>
                        Add
                    </CustomButton>
                </div>
                <div className="space-y-2">
                    {formData.references &&
                        formData.references.map((det, index) => (
                            <div key={index} className="flex p-1">
                                <div className="w-[90%] border border-gray-600 rounded">
                                    {det.itemMetadata && getTitleCompForRefData(det)}
                                </div>
                                <div className="w-[5%] border border-gray-600 rounded flex justify-center items-center">
                                    <FloatingButton
                                        panelClassName="h-20 w-16"
                                        buttonClassName="bg-gray-200 border border-gray-400 text-[10px] px-1 py-0.5"
                                        showButtonText={false}
                                        buttonText={"Actions"}
                                        iconName={"FaSettings"}
                                    >
                                        <CustomButton
                                            className="mt-1"
                                            title={"Delete"}
                                            iconName={"FaDelete"}
                                            onClick={() => deleteReference(det)}
                                        >
                                            Delete
                                        </CustomButton>
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="block p-2.5 mb-4">
                {formErrors.length > 0 && (
                    <div className="space-y-1">
                        {formErrors.map((error, index) => (
                            <span key={index} className="text-red-600 block">
                                {error}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-4 p-2 bg-gray-50 rounded border border-gray-200">
                <pre className="text-xs overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
            </div>
            <div className="block m-2.5">
                <CustomButton onClick={handleSubmitMemoryMap}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
            </div>
        </div>
    );
};

interface DetailPopupProps {
    initialFormData?: Partial<DetailFormData>;
    onSubmit?: (data: DetailFormData) => void;
    onClose?: () => void;
}

const DetailPopup: React.FC<DetailPopupProps> = ({
    initialFormData = {},
    onSubmit = () => { },
    onClose = () => { },
}) => {
    const [formData, setFormData] = useState<DetailFormData>({
        uniqueId: (initialFormData as any)?.uniqueId || "",
        smartContent: (initialFormData as any)?.smartContent || {
            content: "",
            textOutputType: "",
            textInputType: "",
        },
    });

    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

    const handleSmartEditorChange = (smartContent: SmartContent) =>
        setFormData((prevData) => ({ ...prevData, smartContent }));

    const handleSmartEditorError = (error: string | null) => setSmartEditorError(error);

    const validateForm = () => {
        const errors: string[] = [];
        if (smartEditorError) errors.push(smartEditorError);
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        const dataToBeSubmitted = { ...formData };
        if (!(initialFormData as any)?.uniqueId) {
            dataToBeSubmitted.uniqueId = `${CONSTANTS.DRAFT_DETAIL_ID_PREFIX + getDateAsMillisecondsString()}`;
        }
        onSubmit(dataToBeSubmitted);
    };

    return (
        <>
            <Popup headerText="Add detail" onClose={onClose}>
                <div>
                    <div className="block p-2.5 mb-4">
                        <label
                            className="w-[9%] font-bold text-gray-700 inline-block mb-2"
                            htmlFor="description"
                        >
                            Description:
                        </label>
                        <div className="border border-gray-300 p-1 m-1 rounded">
                            <SmartEditor
                                preview={false}
                                initialValue={formData.smartContent}
                                onChange={handleSmartEditorChange}
                                onError={handleSmartEditorError}
                            />
                        </div>
                    </div>

                    <div>
                        {formErrors.length > 0 && (
                            <div className="space-y-1">
                                {formErrors.map((error, index) => (
                                    <span key={index} className="text-red-600 text-sm mt-1 block">
                                        {error}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                        <CustomButton onClick={onClose}>Cancel</CustomButton>
                    </div>
                </div>
            </Popup>
        </>
    );
};

interface ReferencePopupProps {
    initialFormData?: Partial<ReferenceFormData>;
    topicOptions?: SelectOption[];
    linkOptions?: SelectOption[];
    onSubmit?: (data: ReferenceFormData) => void;
    onClose?: () => void;
}

const ReferencePopup: React.FC<ReferencePopupProps> = ({
    initialFormData = {},
    topicOptions = [],
    linkOptions = [],
    onSubmit = () => { },
    onClose = () => { },
}) => {

    const itemTypeOptions: SelectOption[] = [
        { value: ITEM_TYPES.TOPIC, label: "Topic" },
        { value: ITEM_TYPES.SECTION, label: "Section" },
        { value: ITEM_TYPES.LINK, label: "Link" },
        { value: ITEM_TYPES.INTERVIEW_QUESTION, label: "Interview Question" },
        { value: ITEM_TYPES.INTERVIEW_CATEGORY, label: "Interview Category" },
    ];
    const [formData, setFormData] = useState<ReferenceFormData>({
        uniqueId: (initialFormData as any)?.uniqueId || "",
        itemType: (initialFormData as any)?.itemType || "",
        itemMetadata: (initialFormData as any)?.itemMetadata || {},
    });

    const [formErrors, setFormErrors] = useState<string[]>([]);

    const handleItemTypeSelect = (selectedOption: SelectOption) => {
        console.log("Selected Option:", selectedOption);
        setFormData({ ...formData, itemType: selectedOption.value });
    };

    const handleTopicSelect = (selectedTags: SelectOption | null) => {
        if (!selectedTags) return;
        setFormData({
            ...formData,
            itemMetadata: { topicUniqueID: selectedTags.value },
        });
    };

    const handleLinkSelect = (selectedTags: SelectOption | null) => {
        if (!selectedTags) return;
        setFormData({
            ...formData,
            itemMetadata: { linkUniqueID: selectedTags.value },
        });
    };

    const validateForm = () => {
        const errors: string[] = [];
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        const dataToBeSubmitted = { ...formData };
        if (!(initialFormData as any)?.uniqueId) {
            dataToBeSubmitted.uniqueId = `${CONSTANTS.DRAFT_REFERENCE_ID_PREFIX + getDateAsMillisecondsString()}`;
        }
        onSubmit(dataToBeSubmitted);
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            maxHeight: "100px", // Adjust this height to control the visible options
            overflowY: "auto",
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "100px", // Adjust this height to control the visible options
        }),
    };

    return (
        <>
            <Popup headerText="Add Reference" onClose={onClose}>
                <div>
                    <div className="mb-4 p-2 bg-gray-50 rounded border border-gray-200">
                        <pre className="text-xs overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
                    </div>
                    <div className="p-2.5 mb-4">
                        <label
                            htmlFor="itemType"
                            className="w-[20%] font-bold text-gray-700 inline-block mb-2"
                        >
                            Select Item type:
                        </label>
                        <RadioButtonsComponent
                            options={itemTypeOptions}
                            onChange={handleItemTypeSelect}
                        />
                    </div>

                    {formData?.itemType === ITEM_TYPES.TOPIC && (
                        <div className="p-2.5 mb-4">
                            <label
                                htmlFor="topics"
                                className="w-[20%] font-bold text-gray-700 inline-block mb-2"
                            >
                                Add Existing Topics:
                            </label>
                            <Select
                                name="topics"
                                options={topicOptions}
                                onChange={(data) => handleTopicSelect(data)}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                            />
                        </div>
                    )}

                    {formData?.itemType === ITEM_TYPES.LINK && (
                        <div className="p-2.5 mb-4">
                            <label
                                htmlFor="links"
                                className="w-[20%] font-bold text-gray-700 inline-block mb-2"
                            >
                                Add Existing Link:
                            </label>
                            <Select
                                name="links"
                                options={linkOptions}
                                onChange={(data) => handleLinkSelect(data)}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                            />
                        </div>
                    )}

                    <div>
                        {formErrors.length > 0 && (
                            <div className="space-y-1">
                                {formErrors.map((error, index) => (
                                    <span key={index} className="text-red-600 text-sm mt-1 block">
                                        {error}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                        <CustomButton onClick={onClose}>Cancel</CustomButton>
                    </div>
                </div>
            </Popup>
        </>
    );
};

// Styles moved to Tailwind CSS classes

// export default CreateMemoryMapItemRouterPage