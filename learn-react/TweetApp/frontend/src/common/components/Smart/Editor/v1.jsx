import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../../custom-button/CustomButton";
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
            <div className="mb-4">
                <label htmlFor="textOutputType" className="w-[15%] font-bold inline-block mb-2">
                    Text Output Type:
                </label>
                <div className="flex flex-wrap gap-2">
                    {outputTypeList.map((view) => (
                        <label key={view.name} className="p-1.5 cursor-pointer">
                            <input
                                type="radio"
                                value={view.name}
                                checked={selectedOutputTypeName === view.name}
                                onChange={handleChangeOutputTypes}
                                className="mr-1"
                            />
                            {view.label}
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="textInputType" className="w-[15%] font-bold inline-block mb-2">
                    Text Input Type:
                </label>
                <div className="flex flex-wrap gap-2">
                    {selectedOutputType?.linkedInputTypes?.length > 0 &&
                        selectedOutputType.linkedInputTypes.map((lit) => (
                            <label key={lit} className="p-1.5 cursor-pointer">
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
                                    className="mr-1 disabled:opacity-50"
                                />
                                {lit}
                            </label>
                        ))}
                </div>
            </div>
            {formData?.textInputType &&
                formData.textInputType === availableInputTypes.textArea && (
                    <div className="mb-4">
                        <label htmlFor="content" className="font-bold block mb-2">
                            Content:
                        </label>
                        <textarea
                            ref={textareaRef}
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 box-border text-base rounded border border-gray-300 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
            {formData?.textInputType &&
                formData.textInputType === availableInputTypes.ckEditor && (
                    <div className="mb-4">
                        <label htmlFor="ckeditor" className="font-bold block mb-2">
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
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(yamlProcessedData, null, 2) || ""}</pre>
                        {errorMessage && <span className="text-red-600">{errorMessage}</span>}
                    </div>
                )}
        </>
    );
};

export { inpOutp as inpOutpV1, SmartEditor as SmartEditorV1, SmartPreviewer as SmartPreviewerV1 };

