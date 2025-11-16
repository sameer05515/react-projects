import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import {
  getDetailedName,
  SupportedInputComponents,
  getInpOupDetailsForKey,
  getComboOptions,
  getKeyName,
  validateSmartContent,
} from "../common/utils.v4";
import SmartPreviewer from "../Previewer/v4";
import FormMessagesV1 from "../../FormMessages/v1";
import FormMessageBuilder from "../../FormMessages/Builder";
import CustomButton from "../../custom-button/CustomButton";

const debug = false;

// const FormError = ({ error }) => (error ? <div className="alert alert-danger mt-2">{error}</div> : null);

type FormMessage = { type: string; message: string };

interface SmartContent {
  content: string;
  textOutputType: string;
  textInputType: string;
}

interface SmartEditorV4Props {
  initialValue?: Partial<SmartContent>;
  preview?: boolean;
  disableSaveButton?: boolean;
  disableResetButton?: boolean;
  onSubmit?: (data: SmartContent) => Promise<{ isError: boolean; messages: FormMessage[] }>;
}

const SmartEditorV4: React.FC<SmartEditorV4Props> = ({
  initialValue = {
    content: "",
    textOutputType: "",
    textInputType: "",
  },
  preview: previewInitialValue = true,
  disableSaveButton = false,
  disableResetButton = false,
  onSubmit = async () => ({ isError: false, messages: [{ type: "info", message: "Action performed successfully!" }] }),
}) => {
  const [showPreview, setShowPreview] = useState(previewInitialValue);
  const [formMessages, setFormMessages] = useState<FormMessage[]>([]);

  const [formData, setFormData] = useState<SmartContent>({
    content: "",
    textOutputType: "",
    textInputType: "",
  });

  const { detailedName, selectedOutputType } = useMemo(
    () => ({
      selectedOutputType: getKeyName(formData.textOutputType, formData.textInputType),
      detailedName: getDetailedName(formData.textOutputType, formData.textInputType),
    }),
    [formData.textInputType, formData.textOutputType]
  );

  const handleFormUpdate = useCallback((newContent?: string, newOutputType?: string) => {
    if (newContent == null) return;
    const { textInputType, textOutputType } = getInpOupDetailsForKey(newOutputType);
    const validationError = validateSmartContent(newContent, textOutputType);
    if (validationError) {
      // setFormMessages([{ type: "error", message: validationError }]);
      setFormMessages(FormMessageBuilder.builder().appendError(validationError).build());
    }

    setFormData((prev) => ({
      content: newContent,
      textOutputType: textOutputType || prev.textOutputType,
      textInputType: textInputType || prev.textInputType,
    }));
  }, []);

  useEffect(() => {
    if (initialValue)
      handleFormUpdate(
        initialValue?.content || "",
        getKeyName(initialValue?.textOutputType || "", initialValue?.textInputType || "")
      );
  }, [handleFormUpdate, initialValue]);

  const handleChangeOutputTypes = useCallback(
    (newOutputType: string) => {
      if (typeof newOutputType !== "string") {
        // setFormMessages([{ type: "error", message: `Invalid newOutputType: '${newOutputType}'` }]);
        setFormMessages(FormMessageBuilder.builder().appendError(`Invalid newOutputType: '${newOutputType}'`).build());
        return;
      }
      handleFormUpdate(formData.content || "", newOutputType);
    },
    [handleFormUpdate, formData.content]
  );

  const updateFormContent = useCallback(
    (content: string = "") => {
      setFormMessages([]);
      if (!content?.trim()) {
        setFormMessages([{ type: "error", message: "Content cannot be empty" }]);
        // setFormMessages(FormMessageBuilder.builder().appendError("Content cannot be empty").build());
      }
      handleFormUpdate(content || "");
    },
    [handleFormUpdate]
  );

  const handleSave = async () => {
    const result = await onSubmit!(formData);
    if (result.isError) {
      // setFormMessages([...result.messages] || [{ type: "error", message: "Some unexpected error occurred!" }]);
      setFormMessages([
        ...(result.messages || FormMessageBuilder.builder().appendError("Some unexpected error occurred!").build()),
      ]);
    } else {
      setFormMessages([...result.messages]);
    }
  };

  const handleReset = () => {
    setFormMessages([]);
    setFormData({
      content: initialValue?.content || "",
      textOutputType: initialValue?.textOutputType || "",
      textInputType: initialValue?.textInputType || "",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="OutputTypeCombobox" className="block text-sm font-semibold text-gray-800">
          Select Output Type
        </label>
        <select
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="OutputTypeCombobox"
          value={selectedOutputType}
          title={detailedName || ""}
          onChange={(e) => handleChangeOutputTypes(e.target.value)}
        >
          {getComboOptions()}
        </select>
      </div>

      {formData.textInputType === SupportedInputComponents.textArea && (
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-800">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="mt-1 block h-72 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.content}
            onChange={(e) => updateFormContent(e.target.value)}
          />
        </div>
      )}

      {formData.textInputType === SupportedInputComponents.ckEditor && (
        <div>
          <label htmlFor="ckeditor" className="block text-sm font-semibold text-gray-800">
            Content
          </label>
          <div className="mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-inner">
            <CKEditor
              editor={ClassicEditor as any}
              data={formData.content}
              onChange={(_event: any, editor: any) => updateFormContent(editor.getData())}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <CustomButton
          className="bg-white text-gray-800"
          onClick={handleReset}
          disabled={disableResetButton === true}
        >
          Reset
        </CustomButton>
        <CustomButton
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSave}
          disabled={disableSaveButton === true}
        >
          Save
        </CustomButton>
      </div>

      <FormMessagesV1 messages={formMessages} />

      {formData.content && (
        <div className="pt-2">
          <CustomButton
            className="bg-sky-100 text-sky-800 text-xs uppercase"
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </CustomButton>
          {showPreview && <SmartPreviewer data={formData} />}
        </div>
      )}

      {debug && <JSONDataViewer metadata={{ formData, formMessages } as any} title="selectedOutputType" />}
    </div>
  );
};

export default SmartEditorV4;
