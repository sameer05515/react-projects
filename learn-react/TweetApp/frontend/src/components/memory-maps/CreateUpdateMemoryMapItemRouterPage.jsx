import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "../../common/components/smart-editor/SmartEditorV3";
import { selectAllFlatLinks } from "../../redux/slices/linksSlice";
import { createMemoryMap, updateMemoryMap } from "../../redux/slices/memoryMapSlice";
import {
    selectAllFlatTopics
} from "../../redux/slices/topicSlice";

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

const MemoryMapForm = ({
    initialFormData = {},
    onSave = () => { },
    onCancelEdit = () => { },
}) => {
    const dispatch = useDispatch();
    const topics = useSelector(selectAllFlatTopics);
    const links = useSelector(selectAllFlatLinks);

    const topicOptions = topics.map((t) => ({
        value: t.uniqueId, // Assuming topic have unique IDs
        label: t.title, // Display tag title in the dropdown
    }));

    const linkOptions = links.map((l) => ({
        value: l.uniqueId, // Assuming link have unique IDs
        label: l.title, // Display tag title in the dropdown
    }));

    const [formErrors, setFormErrors] = useState([]);
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [showReferencePopup, setShowReferencePopup] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [formData, setFormData] = useState({
        uniqueId: initialFormData?.uniqueId || "",
        name: initialFormData?.name || "",
        details: initialFormData?.details || [],
        references: initialFormData?.references || [],
        parentId: initialFormData?.parentId || "",
    });

    const validateForm = () => {
        const errors = [];
        if (!formData.name.trim()) errors.push("Name is required");
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmitMemoryMap = (event) => {
        event.preventDefault();
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

        setFormData(() => ({ ...updatedMemoryMapObj }))

        if (formData.uniqueId) {
            dispatch(updateMemoryMap({ ...updatedMemoryMapObj, uniqueId: formData.uniqueId }));
        } else {
            dispatch(createMemoryMap(updatedMemoryMapObj));
        }

        onSave();
    };

    const getTitleCompForRefData = (det) => {
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

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const editDetail = (det) => {
        if (!det) return;
        setShowDetailPopup(true);
        setSelectedDetail(() => ({ ...det }));
    };

    const deleteReference = (det) => {
        const updatedReferencesArr = deleteObjectById(
            [...formData.references],
            det.uniqueId
        );
        setFormData((prevData) => ({
            ...prevData,
            references: [...updatedReferencesArr],
        }));
    };

    const deleteDetail = (det) => {
        const updatedDetaillsArr = deleteObjectById(
            [...formData.details],
            det.uniqueId
        );
        setFormData((prevData) => ({
            ...prevData,
            details: [...updatedDetaillsArr],
        }));
    };

    const mergeDetail = (detailData) => {
        const updatedDetaillsArr = updateOrAdd([...formData.details], detailData);
        setFormData((prevData) => ({
            ...prevData,
            details: [...updatedDetaillsArr],
        }));
        setShowDetailPopup(false);
    };

    const mergeReference = (referenceData) => {
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
                    initialFormData={selectedDetail}
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

            <h3>{formData.uniqueId ? "Edit" : "Add"}</h3>
            <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                <label htmlFor="name" style={{ width: "9%", fontWeight: "bold" }}>
                    Name
                </label>
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

            <div style={{ display: "block", padding: "10px" }}>
                <div>
                    <label
                        style={{ width: "9%", fontWeight: "bold" }}
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
                <div>
                    {formData.details &&
                        formData.details.map((det, index) => (
                            <div key={index} style={{ display: "flex", padding: "5px" }}>
                                <div
                                    style={{
                                        width: "90%",
                                        border: "1px solid #999",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {det.smartContent && (
                                        <SmartPreviewer data={det.smartContent} />
                                    )}
                                </div>
                                <div
                                    style={{
                                        width: "5%",
                                        border: "1px solid #999",
                                        borderRadius: "4px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FloatingButton
                                        floatingChildrenStyle={{ width: "50px", height: "80px" }}
                                        showButtonText={false}
                                        buttonText={"Actions"}
                                        iconName={"FaSettings"}
                                    >
                                        <CustomButton
                                            style={{ marginTop: "5px" }}
                                            title={"Edit"}
                                            iconName={"FaEdit"}
                                            onClick={() => editDetail(det)}
                                        />
                                        <CustomButton
                                            style={{ marginTop: "5px" }}
                                            title={"Delete"}
                                            iconName={"FaDelete"}
                                            onClick={() => deleteDetail(det)}
                                        />
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div style={{ display: "block", padding: "10px" }}>
                <div>
                    <label
                        style={{ width: "9%", fontWeight: "bold" }}
                        htmlFor="description"
                    >
                        References:
                    </label>
                    <CustomButton onClick={() => setShowReferencePopup(true)}>
                        Add
                    </CustomButton>
                </div>
                <div>
                    {formData.references &&
                        formData.references.map((det, index) => (
                            <div key={index} style={{ display: "flex", padding: "5px" }}>
                                <div
                                    style={{
                                        width: "90%",
                                        border: "1px solid #999",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {det.itemMetadata && getTitleCompForRefData(det)}
                                </div>
                                <div
                                    style={{
                                        width: "5%",
                                        border: "1px solid #999",
                                        borderRadius: "4px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <FloatingButton
                                        floatingChildrenStyle={{ width: "50px", height: "80px" }}
                                        showButtonText={false}
                                        buttonText={"Actions"}
                                        iconName={"FaSettings"}
                                    >
                                        <CustomButton
                                            style={{ marginTop: "5px" }}
                                            title={"Delete"}
                                            iconName={"FaDelete"}
                                            onClick={() => deleteReference(det)}
                                        />
                                    </FloatingButton>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div style={{ display: "block", padding: "10px" }}>
                {formErrors.length > 0 && (
                    <div>
                        {formErrors.map((error, index) => (
                            <span key={index} style={{ color: "red" }}>
                                {error}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
            <div style={{ display: "block", margin: "10px" }}>
                <CustomButton onClick={handleSubmitMemoryMap}>
                    {formData.uniqueId ? "Update" : "Create"}
                </CustomButton>
                <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
            </div>
        </div>
    );
};

const DetailPopup = ({
    initialFormData = {},
    onSubmit = () => { },
    onClose = () => { },
}) => {
    const [formData, setFormData] = useState({
        uniqueId: initialFormData?.uniqueId || "",
        smartContent: initialFormData?.smartContent || {
            content: "",
            textOutputType: "",
            textInputType: "",
        },
    });

    const [formErrors, setFormErrors] = useState([]);

    const [smartEditorError, setSmartEditorError] = useState(null);

    const handleSmartEditorChange = (smartContent) =>
        setFormData((prevData) => ({ ...prevData, smartContent }));

    const handleSmartEditorError = (error) => setSmartEditorError(error);

    const validateForm = () => {
        const errors = [];
        if (smartEditorError) errors.push(smartEditorError);
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const dataToBeSubmitted = { ...formData };
        if (!initialFormData?.uniqueId) {
            dataToBeSubmitted.uniqueId = `${CONSTANTS.DRAFT_DETAIL_ID_PREFIX + getDateAsMillisecondsString()}`;
        }
        onSubmit(dataToBeSubmitted);
    };

    return (
        <>
            <Popup headerText="Add detail" onClose={onClose}>
                <div>
                    <div style={{ display: "block", padding: "10px" }}>
                        <label
                            style={{ width: "9%", fontWeight: "bold" }}
                            htmlFor="description"
                        >
                            Description:
                        </label>
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: "5px",
                                margin: "5px",
                            }}
                        >
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
                            <div>
                                {formErrors.map((error, index) => (
                                    <span key={index} style={styles.error}>
                                        {error}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                        <CustomButton onClick={onClose}>Cancel</CustomButton>
                    </div>
                </div>
            </Popup>
        </>
    );
};

const ITEM_TYPES = {
    TOPIC: "topic",
    SECTION: "section",
    LINK: "link",
    INTERVIEW_QUESTION: "interview-question",
    INTERVIEW_CATEGORY: "interview-category",
};

const ReferencePopup = ({
    initialFormData = {},
    topicOptions = [],
    linkOptions = [],
    onSubmit = () => { },
    onClose = () => { },
}) => {

    const itemTypeOptions = [
        { value: ITEM_TYPES.TOPIC, label: "Topic" },
        { value: ITEM_TYPES.SECTION, label: "Section" },
        { value: ITEM_TYPES.LINK, label: "Link" },
        { value: ITEM_TYPES.INTERVIEW_QUESTION, label: "Interview Question" },
        { value: ITEM_TYPES.INTERVIEW_CATEGORY, label: "Interview Category" },
    ];
    const [formData, setFormData] = useState({
        uniqueId: initialFormData?.uniqueId || "",
        itemType: initialFormData?.itemType || "",
        itemMetadata: initialFormData?.itemMetadata || {},
    });

    const [formErrors, setFormErrors] = useState([]);

    const handleItemTypeSelect = (selectedOption) => {
        console.log("Selected Option:", selectedOption);
        setFormData({ ...formData, itemType: selectedOption.value });
    };

    const handleTopicSelect = (selectedTags) => {
        setFormData({
            ...formData,
            itemMetadata: { topicUniqueID: selectedTags.value },
        });
    };

    const handleLinkSelect = (selectedTags) => {
        setFormData({
            ...formData,
            itemMetadata: { linkUniqueID: selectedTags.value },
        });
    };

    const validateForm = () => {
        const errors = [];
        // if (smartEditorError) errors.push(smartEditorError);
        setFormErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const dataToBeSubmitted = { ...formData };
        if (!initialFormData?.uniqueId) {
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
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                    <div style={{ padding: "10px" }}>
                        <label
                            htmlFor="itemType"
                            style={{ width: "20%", fontWeight: "bold" }}
                        >
                            Select Item type:
                        </label>
                        <RadioButtonsComponent
                            options={itemTypeOptions}
                            onChange={handleItemTypeSelect}
                        />
                    </div>

                    {formData?.itemType === ITEM_TYPES.TOPIC && (
                        <div style={{ padding: "10px" }}>
                            <label
                                htmlFor="topics"
                                style={{ width: "20%", fontWeight: "bold" }}
                            >
                                Add Existing Topics:
                            </label>
                            <Select
                                name="topics"
                                options={topicOptions}
                                // defaultValue={selectedOption}
                                // value={topicOptions.filter((t) => t.value === formData.uniqueId)}
                                onChange={(data) => handleTopicSelect(data, ITEM_TYPES.TOPIC)}
                                styles={customStyles}
                                menuPortalTarget={document.body} // Ensure the menu is rendered in the DOM
                            />
                        </div>
                    )}

                    {formData?.itemType === ITEM_TYPES.LINK && (
                        <div style={{ padding: "10px" }}>
                            <label
                                htmlFor="links"
                                style={{ width: "20%", fontWeight: "bold" }}
                            >
                                Add Existing Link:
                            </label>
                            <Select
                                name="links"
                                options={linkOptions}
                                // defaultValue={selectedOption}
                                // value={topicOptions.filter((t) => t.value === formData.uniqueId)}
                                onChange={(data) => handleLinkSelect(data, ITEM_TYPES.LINK)}
                                styles={customStyles}
                                menuPortalTarget={document.body} // Ensure the menu is rendered in the DOM
                            />
                        </div>
                    )}

                    <div>
                        {formErrors.length > 0 && (
                            <div>
                                {formErrors.map((error, index) => (
                                    <span key={index} style={styles.error}>
                                        {error}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                        <CustomButton onClick={onClose}>Cancel</CustomButton>
                    </div>
                </div>
            </Popup>
        </>
    );
};

const styles = {
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
        display: "block",
    },
};

// export default CreateMemoryMapItemRouterPage