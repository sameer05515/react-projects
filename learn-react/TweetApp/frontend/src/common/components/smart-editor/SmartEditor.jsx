import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../CustomButton";
import MarkdownComponent from "../MarkdownComponent";

const inpOutp = () => {
    const availableOutputTypes = {
        HTML: "html",
        YAML: "yaml",
        MARKDOWN: "markdown",
        TEXT: "text",
    };
    const availableInputTypes = {
        textArea: "TextArea",
        ckEditor: "CKEditor",
    };
    const outputTypeList = [
        {
            name: availableOutputTypes.HTML,
            label: "HTML",
            linkedInputTypes: [
                availableInputTypes.textArea,
                availableInputTypes.ckEditor,
            ],
        },
        {
            name: availableOutputTypes.YAML,
            label: "YAML",
            linkedInputTypes: [availableInputTypes.textArea],
        },
        {
            name: availableOutputTypes.MARKDOWN,
            label: "MARKDOWN",
            linkedInputTypes: [availableInputTypes.textArea],
        },
        {
            name: availableOutputTypes.TEXT,
            label: "TEXT",
            linkedInputTypes: [availableInputTypes.textArea],
        },
    ];

    const getOutputTypeByName = (name) =>
        outputTypeList.find((ot) => ot.name === name);
    return {
        outputTypeList,
        availableOutputTypes,
        availableInputTypes,
        getOutputTypeByName,
    };
};

const SmartEditor = ({
    initialValue,
    preview: previewIntialValue = true,
    onChange = () => { },
    onError = () => { },
}) => {
    const {
        outputTypeList,
        availableOutputTypes,
        availableInputTypes,
        getOutputTypeByName,
    } = inpOutp();

    const textareaRef = useRef(null);

    const [selectedOutputType, setSelectedOutputType] = useState(
        getOutputTypeByName(availableOutputTypes.HTML)
    );

    const [selectedOutputTypeName, setSelectedOutputTypeName] = useState(
        availableOutputTypes.HTML
    );

    const [showPreview, setShowPreview] = useState(previewIntialValue);

    const [formData, setFormData] = useState({
        content: initialValue && initialValue.content ? initialValue.content : "",
        textOutputType:
            initialValue && initialValue.textOutputType
                ? initialValue.textOutputType
                : availableOutputTypes.HTML,
        textInputType:
            initialValue && initialValue.textInputType
                ? initialValue.textInputType
                : availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (selectedOutputTypeName) {
            setSelectedOutputType((prev) =>
                getOutputTypeByName(selectedOutputTypeName)
            );
            if (selectedOutputTypeName !== availableOutputTypes.HTML) {
                setFormData((prev) => ({
                    ...prev,
                    textInputType: availableInputTypes.textArea,
                }));
            }
        }
    }, [selectedOutputTypeName]);

    useEffect(() => {
        if (initialValue) {
            setFormData(pre => ({
                content: initialValue && initialValue.content ? initialValue.content : "",
                textOutputType:
                    initialValue && initialValue.textOutputType
                        ? initialValue.textOutputType
                        : availableOutputTypes.HTML,
                textInputType:
                    initialValue && initialValue.textInputType
                        ? initialValue.textInputType
                        : availableInputTypes.ckEditor,
            }))
        }
    }, [initialValue]);


    useEffect(() => {
        // This effect will run only when formData.content changes
        // console.log("formData.content changed:", formData.content);
        // Add your logic here that should run when formData.content changes
        let metadata = {};
        let error = null;
        if (
            formData?.content &&
            formData?.textOutputType === availableOutputTypes.YAML
        ) {
            try {
                metadata = yaml.load(formData.content);
            } catch (e) {
                if (e.mark) {
                    // If the error has 'mark' property, it contains line and column information
                    const errorLine = e.mark.line + 1; // Adjust for 0-based index
                    error = `Error parsing YAML at line ${errorLine}: ${e.message}`;
                } else {
                    // If the error does not have 'mark' property, it's a general parsing error
                    error = `Error parsing YAML: ${e.message}`;
                }
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error);
        }

        if (!formData.content || formData.content.trim().length === 0) {
            error = `content is empty`;
        }

        if (
            formData.content &&
            formData.textInputType === availableInputTypes.textArea
        ) {
            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight * 1.3 + "px";
        }

        if (formData) {
            onChange(formData);
        }

        onError(error);
    }, [formData.content, formData.textOutputType]);

    const handleChangeOutputTypes = (event) => {
        setSelectedOutputTypeName(event.target.value);
        setFormData((prev) => ({
            ...prev,
            textOutputType: event.target.value,
        }));
    };

    const handleChangeInputTypes = (event) => {
        setFormData((prev) => ({
            ...prev,
            textInputType: event.target.value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, content: data });
    };

    return (
        <div>
            SmartEditor
            <div>
                <label htmlFor="textOutputType" style={labelStyle}>
                    Text Output Type:
                </label>
                {outputTypeList.map((view) => (
                    <label key={view.name} style={{ padding: "5px" }}>
                        <input
                            type="radio"
                            value={view.name}
                            checked={selectedOutputTypeName === view.name}
                            onChange={handleChangeOutputTypes}
                        />
                        {view.label}
                    </label>
                ))}
            </div>
            <div>
                <label htmlFor="textInputType" style={labelStyle}>
                    Text Input Type:
                </label>
                {selectedOutputType?.linkedInputTypes?.length > 0 &&
                    selectedOutputType.linkedInputTypes.map((lit) => (
                        <label key={lit} style={{ padding: "5px" }}>
                            <input
                                type="radio"
                                value={lit}
                                disabled={formData.textOutputType !== availableOutputTypes.HTML}
                                checked={
                                    formData.textOutputType !== availableOutputTypes.HTML
                                        ? true
                                        : formData.textInputType === lit
                                }
                                onChange={handleChangeInputTypes}
                            />
                            {lit}
                        </label>
                    ))}
            </div>
            {formData?.textInputType &&
                formData.textInputType === availableInputTypes.textArea && (
                    <div>
                        <label htmlFor="content" style={labelStyle}>
                            Content:
                        </label>
                        <br />
                        <textarea
                            ref={textareaRef}
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            style={styles.textarea}
                        />
                    </div>
                )}
            {formData?.textInputType &&
                formData.textInputType === availableInputTypes.ckEditor && (
                    <div>
                        <label htmlFor="ckeditor" style={labelStyle}>
                            Content:
                        </label>
                        <CKEditor
                            id="ckeditor"
                            name="content"
                            editor={ClassicEditor}
                            data={formData.content}
                            onChange={handleEditorChange}
                        />
                    </div>
                )}
            {/* {previewOutput()} */}
            {
                formData?.content &&
                <div>
                    <b>Preview:</b>{" "}
                    <CustomButton
                        onClick={() => {
                            setShowPreview((pre) => !pre);
                        }}
                    >
                        {showPreview ? "Hide" : "Show"}
                    </CustomButton>
                </div>
            }
            {showPreview && (
                <>
                    <SmartPreviewer data={formData} />
                </>
            )}
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </div>
    );
};

const labelStyle = {
    width: "15%", // Set label width to 25%
    fontWeight: "bold", // Make label text bold
};

// const pairedComponentStyle = {
//     width: "100%", // Set paired component width to 100%
// };

const styles = {
    textarea: {
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        fontSize: "16px",
        // lineHeight: '1.5',
        borderRadius: "4px",
        border: "1px solid #ccc",
        resize: "none",
        overflow: "hidden",
    },
};

const SmartPreviewer = ({ data: initialValue }) => {
    const {
        // outputTypeList,
        availableOutputTypes,
        availableInputTypes,
        // getOutputTypeByName,
    } = inpOutp();
    const [formData, setFormData] = useState({
        content: initialValue && initialValue.content ? initialValue.content : "",
        textOutputType:
            initialValue && initialValue.textOutputType
                ? initialValue.textOutputType
                : availableOutputTypes.HTML,
        textInputType:
            initialValue && initialValue.textInputType
                ? initialValue.textInputType
                : availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // This effect will run only when formData.content changes
        // console.log("formData.content changed:", formData.content);
        // Add your logic here that should run when formData.content changes
        if (
            formData?.content &&
            formData?.textOutputType === availableOutputTypes.YAML
        ) {
            let metadata = {};
            let error = "";
            try {
                metadata = yaml.load(formData.content);
            } catch (e) {
                if (e.mark) {
                    // If the error has 'mark' property, it contains line and column information
                    const errorLine = e.mark.line + 1; // Adjust for 0-based index
                    error = `Error parsing YAML at line ${errorLine}: ${e.message}`;
                } else {
                    // If the error does not have 'mark' property, it's a general parsing error
                    error = `Error parsing YAML: ${e.message}`;
                }
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error);
        }
    }, [formData.content]);

    useEffect(() => {
        setFormData((prev) => ({
            content: initialValue && initialValue.content ? initialValue.content : "",
            textOutputType:
                initialValue && initialValue.textOutputType
                    ? initialValue.textOutputType
                    : availableOutputTypes.HTML,
            textInputType:
                initialValue && initialValue.textInputType
                    ? initialValue.textInputType
                    : availableInputTypes.ckEditor,
        }));
    }, [initialValue]);

    return (
        <>
            {formData?.textOutputType &&
                formData.textOutputType === availableOutputTypes.HTML && (
                    <div>{ReactHtmlParser(formData.content || "")}</div>
                )}
            {formData?.textOutputType &&
                formData.textOutputType === availableOutputTypes.MARKDOWN && (
                    <MarkdownComponent markdownText={formData.content || ""} />
                )}
            {formData?.textOutputType &&
                formData.textOutputType === availableOutputTypes.TEXT && (
                    <div>
                        <pre>{formData.content || ""}</pre>
                    </div>
                )}
            {formData?.textOutputType &&
                formData.textOutputType === availableOutputTypes.YAML && (
                    <div>
                        <pre>{JSON.stringify(yamlProcessedData, null, 2) || ""}</pre>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                    </div>
                )}
        </>
    );
};

export { inpOutp as inpOutpV1, SmartEditor as SmartEditorV1, SmartPreviewer as SmartPreviewerV1 };

