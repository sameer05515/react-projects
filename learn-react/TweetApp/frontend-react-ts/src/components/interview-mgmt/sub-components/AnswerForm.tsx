import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
// import Select from "react-select";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartEditor } from "../../../common/components/Smart/Editor/v3";
import {
  createAnswer,
  updateAnswer,
} from "../../../redux/slices/interviewMgmtSlice";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";

const AnswerForm = ({
  questionName,
  initialFormData,
  onSave,
  onCancelEdit,
}) => {
  const dispatch = useDispatch();

  const { refreshCategoryTree } = useInterviewMgmt();

  const [formData, setFormData] = useState({
    uniqueId: initialFormData?.uniqueId || "",
    name: initialFormData?.name || "",
    heading: initialFormData?.heading || "",
    linkedQuestionsId: initialFormData?.linkedQuestionsId || "",
    smartContent: initialFormData?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    rating: initialFormData?.rating || 0,
    tags: initialFormData?.tags || [],
  });

  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const validateForm = useCallback(() => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (!formData.heading.trim()) {
      errors.push("Heading is required");
    }

    if (formData.rating <= 0) {
      errors.push("Rating is required, it should have non-zero value");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);
    return errors.length === 0;
  }, [formData.heading, formData.name, formData.rating, smartEditorError]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // const handleTagSelect = useCallback((selectedTags) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     tags: selectedTags.map((tag) => tag.value),
  //   }));
  // }, []);

  // const tagOptions = availableTags.map((tag) => ({
  //   value: tag.uniqueId,
  //   label: tag.title,
  // }));

  const handleSaveCategory = useCallback(
    (event) => {
      event.preventDefault();
      if (!validateForm()) {
        return;
      }

      const action = initialFormData?.uniqueId
        ? dispatch(
            updateAnswer({ ...formData, uniqueId: initialFormData.uniqueId })
          )
        : dispatch(createAnswer(formData));

      // if (initialFormData?.uniqueId) {
      //   // dispatch(
      //   //   updateCategory({ ...formData, uniqueId: initialFormData.uniqueId })
      //   // );
      //   console.log('Update facility will be available soon!!')
      // } else {
      //   dispatch(createAnswer(formData));
      // }

      action.then(() => {
        // if (formData.uniqueId) setFormData(selectedNode);
        // else
        // refreshNodes();
        // dispatch(fetchCategoryTree());
        refreshCategoryTree();
        onSave();
      });

      if (onSave) {
        // onSave();
      }
    },
    [
      validateForm,
      initialFormData.uniqueId,
      dispatch,
      formData,
      onSave,
      refreshCategoryTree,
    ]
  );

  const handleSmartEditorChange = useCallback((smartContent) => {
    setFormData((prev) => ({ ...prev, smartContent }));
  }, []);

  const handleSmartEditorError = useCallback((error) => {
    setSmartEditorError(error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {initialFormData?.uniqueId ? "Edit Answer" : "Add Answer"}{" "}
        {`For Question: ${questionName}`}
      </h3>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="name" className="w-[9%] font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="heading" className="w-[9%] font-bold text-gray-700">
          Heading:
        </label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={formData.heading}
          onChange={handleInputChange}
          className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="rating" className="w-[9%] font-bold text-gray-700">
          Rating:
        </label>
        <RatingComponent
          id="rating"
          rating={formData.rating}
          editable={true}
          onEdit={(editedValue) => {
            setFormData((prev) => ({ ...prev, rating: editedValue }));
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Description:</label>
        <div className="border border-gray-300 p-1.5 m-1.5 rounded">
          <SmartEditor
            initialValue={formData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>
      {formErrors.length > 0 && (
        <div className="mt-4">
          {formErrors.map((error, index) => (
            <span key={index} className="block text-red-600 text-sm mt-1.5">
              {error}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 flex gap-2">
        <CustomButton onClick={handleSaveCategory}>
          {initialFormData?.uniqueId ? "Update Changes" : "Save Changes"}
        </CustomButton>
        <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
      </div>
      <div className="mt-4">
        <JSONDataViewer
          metadata={{
            initialFormData,
            formData,
          }}
          title="All collated Responses"
        />
      </div>
    </div>
  );
};

export default AnswerForm;
