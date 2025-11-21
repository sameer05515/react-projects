import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../custom-button/CustomButton";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";

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

interface SmartEditorValue {
    content: string;
    textOutputType: string;
    textInputType: string;
}

interface SmartEditorProps {
    initialValue?: Partial<SmartEditorValue>;
    preview?: boolean;
    onChange?: (value: SmartEditorValue) => void;
    onError?: (message: string | null) => void;
}

const SmartEditor: React.FC<SmartEditorProps> = ({
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

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [selectedOutputTypeName, setSelectedOutputTypeName] = useState(
        initialValue?.textOutputType || availableOutputTypes.HTML
    );

    const [formData, setFormData] = useState<SmartEditorValue>({
        content: initialValue?.content || "",
        textOutputType: initialValue?.textOutputType || availableOutputTypes.HTML,
        textInputType: initialValue?.textInputType || availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
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
        let metadata: any = {};
        let error: string | null = null;
        if (formData?.content && formData?.textOutputType === availableOutputTypes.YAML) {
            try {
                metadata = yaml.load(formData.content);
            } catch (e: unknown) {
                const err = e as any;
                error = `Error parsing YAML: ${String(err?.message || e)}`;
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error || "");
        }

        if (!formData.content || formData.content.trim().length === 0) {
            error = `content is empty`;
        }

        if (formData.content && formData.textInputType === availableInputTypes.textArea) {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight * 1.3 + "px";
            }
        }

        if (formData) {
            onChange(formData);
        }

        onError(error);
    }, [formData.content, formData.textOutputType]);

    const handleChangeOutputTypes = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOutputTypeName(event.target.value);
        setFormData((prev) => ({
            ...prev,
            textOutputType: event.target.value,
        }));
    };

    const handleChangeInputTypes = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            textInputType: event.target.value,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleEditorChange = (_event: any, editor: any) => {
        const data = editor.getData();
        setFormData({ ...formData, content: data });
    };

    return (
        <div className="space-y-4">
            <div className="font-semibold mb-2">SmartEditor</div>
            <div>
                <label htmlFor="textOutputType" className="w-[15%] font-bold inline-block">
                    Text Output Type:
                </label>
                <select
                    value={selectedOutputTypeName}
                    onChange={handleChangeOutputTypes}
                    className="ml-2.5 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {outputTypeList.map((view) => (
                        <option key={view.name} value={view.name}>
                            {view.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="textInputType" className="w-[15%] font-bold inline-block">
                    Text Input Type:
                </label>
                <select
                    value={formData.textInputType}
                    onChange={handleChangeInputTypes}
                    className="ml-2.5 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
            {formData.textInputType === availableInputTypes.ckEditor && (
                <div>
                    <label htmlFor="ckeditor" className="font-bold block mb-2">
                        Content:
                    </label>
                    <CKEditor
                        editor={ClassicEditor as any}
                        data={formData.content}
                        onChange={handleEditorChange}
                    />
                </div>
            )}
            {formData?.content && (
                <div className="mb-2">
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

const SmartPreviewer: React.FC<{ data: SmartEditorValue }> = ({ data: initialValue }) => {
    const {
        availableOutputTypes,
        availableInputTypes,
    } = inpOutp();

    const [formData, setFormData] = useState<SmartEditorValue>({
        content: initialValue?.content || "",
        textOutputType: initialValue?.textOutputType || availableOutputTypes.HTML,
        textInputType: initialValue?.textInputType || availableInputTypes.ckEditor,
    });

    const [yamlProcessedData, setYamlProcessedData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (formData?.content && formData?.textOutputType === availableOutputTypes.YAML) {
            let metadata = {};
            let error = "";
            try {
                metadata = yaml.load(formData.content);
            } catch (e: unknown) {
                const err = e as any;
                error = `Error parsing YAML: ${String(err?.message || e)}`;
            }
            setYamlProcessedData(metadata);
            setErrorMessage(error || "");
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
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
            )}
            {formData.textOutputType === availableOutputTypes.MARKDOWN && (
                <MarkdownComponent markdownText={formData.content} />
            )}
            {formData.textOutputType === availableOutputTypes.YAML && (
                <div>
                    {errorMessage && (
                        <div className="text-red-600">{errorMessage}</div>
                    )}
                    {!errorMessage && (
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">{yamlProcessedData && JSON.stringify(yamlProcessedData, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
};

export { inpOutp, SmartEditor, SmartPreviewer };
