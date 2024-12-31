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

    const [selectedOutputTypeName, setSelectedOutputTypeName] = useState(
        initialValue?.textOutputType || availableOutputTypes.HTML
    );

    const [formData, setFormData] = useState({
        content: initialValue?.content || "",
        textOutputType: initialValue?.textOutputType || availableOutputTypes.HTML,
        textInputType: initialValue?.textInputType || availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPreview, setShowPreview] = useState(previewIntialValue);

    useEffect(() => {
        if (selectedOutputTypeName) {
            const selectedOutputType = getOutputTypeByName(selectedOutputTypeName);
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
            setFormData({
                content: initialValue.content || "",
                textOutputType: initialValue.textOutputType || availableOutputTypes.HTML,
                textInputType: initialValue.textInputType || availableInputTypes.ckEditor,
            });
        }
    }, [initialValue]);

    useEffect(() => {
        let metadata = {};
        let error = null;
        if (formData?.content && formData?.textOutputType === availableOutputTypes.YAML) {
            try {
                metadata = yaml.load(formData.content);
            } catch (e) {
                error = `Error parsing YAML: ${e.message}`;
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error);
        }

        if (!formData.content || formData.content.trim().length === 0) {
            error = `content is empty`;
        }

        if (formData.content && formData.textInputType === availableInputTypes.textArea) {
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
                <select
                    value={selectedOutputTypeName}
                    onChange={handleChangeOutputTypes}
                    style={{ marginLeft: "10px" }}
                >
                    {outputTypeList.map((view) => (
                        <option key={view.name} value={view.name}>
                            {view.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="textInputType" style={labelStyle}>
                    Text Input Type:
                </label>
                <select
                    value={formData.textInputType}
                    onChange={handleChangeInputTypes}
                    style={{ marginLeft: "10px" }}
                    disabled={selectedOutputTypeName !== availableOutputTypes.HTML}
                >
                    {selectedOutputTypeName === availableOutputTypes.HTML &&
                        getOutputTypeByName(selectedOutputTypeName)?.linkedInputTypes.map((lit) => (
                            <option key={lit} value={lit}>
                                {lit}
                            </option>
                        ))}
                </select>
            </div>
            {formData.textInputType === availableInputTypes.textArea && (
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
            {formData.textInputType === availableInputTypes.ckEditor && (
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
            {formData?.content && (
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
            )}
            {showPreview && <SmartPreviewer data={formData} />}
        </div>
    );
};

const labelStyle = {
    width: "15%", 
    fontWeight: "bold", 
};

const styles = {
    textarea: {
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        resize: "none",
        overflow: "hidden",
    },
};

const SmartPreviewer = ({ data: initialValue }) => {
    const {
        availableOutputTypes,
        availableInputTypes,
    } = inpOutp();

    const [formData, setFormData] = useState({
        content: initialValue?.content || "",
        textOutputType: initialValue?.textOutputType || availableOutputTypes.HTML,
        textInputType: initialValue?.textInputType || availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (formData?.content && formData?.textOutputType === availableOutputTypes.YAML) {
            let metadata = {};
            let error = "";
            try {
                metadata = yaml.load(formData.content);
            } catch (e) {
                error = `Error parsing YAML: ${e.message}`;
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error);
        }
    }, [formData.content]);

    useEffect(() => {
        setFormData({
            content: initialValue?.content || "",
            textOutputType: initialValue?.textOutputType || availableOutputTypes.HTML,
            textInputType: initialValue?.textInputType || availableInputTypes.ckEditor,
        });
    }, [initialValue]);

    return (
        <div>
            {formData.textOutputType === availableOutputTypes.TEXT && (
                <pre>{formData.content}</pre>
            )}
            {formData.textOutputType === availableOutputTypes.HTML && (
                <div>{ReactHtmlParser(formData.content)}</div>
            )}
            {formData.textOutputType === availableOutputTypes.MARKDOWN && (
                <MarkdownComponent text={formData.content} />
            )}
            {formData.textOutputType === availableOutputTypes.YAML && (
                <div>
                    {errorMessage && (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    {!errorMessage && (
                        <pre>{yamlProcessedData && JSON.stringify(yamlProcessedData, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
};

export { inpOutp, SmartEditor, SmartPreviewer };
