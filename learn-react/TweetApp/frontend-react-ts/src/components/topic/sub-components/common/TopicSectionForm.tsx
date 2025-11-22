import React, { useEffect, useMemo, useState } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../../../common/components/Smart/Editor/v3";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching/v1";
import { useSelector } from "react-redux";
import { selectTagsForComboOptions } from "../../../../redux/slices/tagsSlice";
import Select from "react-select";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";

interface TopicSectionFormProps {
  formData?: any;
  selectedTopic?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const TopicSectionForm: React.FC<TopicSectionFormProps> = ({
  formData: initialValue,
  selectedTopic,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const tagOptions = useSelector(selectTagsForComboOptions);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    uniqueId: initialValue?.uniqueId || "",
    linkedTopicUniqueId: initialValue?.linkedTopicUniqueId || "",
    name: initialValue?.name || "",
    smartContent: initialValue?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    tags: initialValue?.tags || [],
  });

  // ✅ Memoize URL to prevent infinite loops
  const sectionFetchUrl = useMemo(
    () => `${BACKEND_APPLICATION_BASE_URL}/topics/${initialValue?.linkedTopicUniqueId}/sections/${initialValue?.uniqueId}`,
    [initialValue?.linkedTopicUniqueId, initialValue?.uniqueId]
  );
  const { data: sectionsData, refetch: sectionsRefetch } = useDataFetching({
    url: sectionFetchUrl,
    source: "TopicSectionForm",
  } as any);

  useEffect(() => {
    if (initialValue?.linkedTopicUniqueId && initialValue?.uniqueId) {
      sectionsRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue?.linkedTopicUniqueId, initialValue?.uniqueId]); // Removed sectionsRefetch from dependencies to prevent infinite loop

  useEffect(() => {
    setLoading(false);
    if (sectionsData) {
      console.trace("sectionsData: ", sectionsData);
      setFormData((prev) => ({ ...(sectionsData as any) }));
      // setLoading(false);
    }
  }, [sectionsData]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent: any) => {
    setFormData({ ...formData, smartContent });
  };

  const handleTagSelect = (selectedTags: any) => {
    setFormData({ ...formData, tags: (selectedTags as any[]).map((tag) => (tag as any).value) });
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // const tagOptions = flatTagList.map((tag) => ({
  //   value: tag.uniqueId,
  //   label: tag.title,
  // }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{formData.uniqueId ? "Update Section" : "Create Section"}</h2>
      <p>
        <strong>Topic:</strong> {selectedTopic?.title || "Invalid Topic"}
      </p>

      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-1.5">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-2 py-2 mb-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="border border-gray-300 p-2.5 my-2.5 rounded">
        <SmartEditor
          initialValue={formData.smartContent}
          onChange={handleSmartEditorChange}
          onError={setSmartEditorError}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block font-bold mb-2">Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions as any}
          value={(tagOptions as any).filter((tag: any) => formData.tags.includes(tag.value))}
          onChange={handleTagSelect as any}
        />
      </div>

      {formErrors.length > 0 && (
        <div className="mb-2.5">
          {formErrors.map((error, index) => (
            <span key={index} className="text-red-600 text-sm block">
              {error}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex gap-2.5">
        <CustomButton onClick={handleSubmitClick}>
          {formData.uniqueId ? "Update" : "Save"} Changes
        </CustomButton>
        <CustomButton onClick={onCancel}>Cancel</CustomButton>
      </div>

      <JSONDataViewer metadata={{ formData } as any} />
    </div>
  );
};


export default TopicSectionForm;
