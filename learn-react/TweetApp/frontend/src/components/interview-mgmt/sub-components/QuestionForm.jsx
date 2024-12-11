import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartEditor } from "../../../common/components/smart-editor/SmartEditorV3";
import {
  createQuestion, updateQuestion
} from "../../../redux/slices/interviewMgmtSlice";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";

const QuestionForm = ({ initialFormData, onSave, onCancelEdit }) => {
  const dispatch = useDispatch();
  // const availableTags = useSelector(selectAllFlatTags);
  const {
    availableTags,refreshCategoryTree
  } = useInterviewMgmt();

  const [formData, setFormData] = useState({
    uniqueId: initialFormData?.uniqueId || "",
    name: initialFormData?.name || "",
    heading: initialFormData?.heading || "",
    linkedCategoryId: initialFormData?.linkedCategoryId || "",
    smartContent: initialFormData?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    parentId: initialFormData?.parentId || "",
    rating: initialFormData?.rating || 3,
    tags: initialFormData?.tags || [],
  });

  // useEffect(()=>{
  //   setFormData(()=>({...initialFormData}));
  // }, [initialFormData])

  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  // useEffect(() => {
  //   if (createCategoryResponse?.error || updateCategoryResponse?.error) {
  //     setFormErrors([
  //       createCategoryResponse?.error ||
  //       updateCategoryResponse?.error ||
  //       "Missing error message: Please contact administrator",
  //     ]);
  //   }
  // }, [createCategoryResponse, updateCategoryResponse]);

  // useEffect(() => {
  //   dispatch(fetchTags());
  // }, [dispatch]);

  const validateForm = () => {
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
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTagSelect = useCallback((selectedTags) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedTags.map((tag) => tag.value),
    }));
  }, []);

  const tagOptions = availableTags.map((tag) => ({
    value: tag.uniqueId,
    label: tag.title,
  }));

  const handleSaveCategory = useCallback(
    (event) => {
      event.preventDefault();
      if (!validateForm()) {
        return;
      }

      const action = initialFormData?.uniqueId ?
        dispatch(updateQuestion({ ...formData, uniqueId: initialFormData.uniqueId })) :
        dispatch(createQuestion(formData));

      // if (initialFormData?.uniqueId) {
      //   // dispatch(
      //   //   updateCategory({ ...formData, uniqueId: initialFormData.uniqueId })
      //   // );
      //   console.log('Update facility will be available soon!!')
      // } else {
      //   dispatch(createQuestion(formData));
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
    [formData, validateForm, initialFormData, dispatch, onSave]
  );

  const handleSmartEditorChange = useCallback((smartContent) => {
    setFormData((prev) => ({ ...prev, smartContent }));
  }, []);

  const handleSmartEditorError = useCallback((error) => {
    setSmartEditorError(error);
  }, []);

  if(!initialFormData){
    return <>Bhosri wale data kaun dega? Tera baap??</>
  }

  return (
    <div style={styles.formStyle}>
      <h3>{initialFormData?.uniqueId ? "Edit Question" : "Add Question"}</h3>
      <div style={styles.fieldRow}>
        <label htmlFor="name" style={styles.labelStyle}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={styles.inputStyle}
        />
      </div>
      <div style={styles.fieldRow}>
        <label htmlFor="heading" style={styles.labelStyle}>
          Heading:
        </label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={formData.heading}
          onChange={handleInputChange}
          style={styles.inputStyle}
        />
      </div>
      <div style={styles.fieldRow}>
        <label htmlFor="rating" style={styles.labelStyle}>
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
      <div>
        <label htmlFor="description">Additional Description for Question:</label>
        <div style={styles.smartEditorContainer}>
          <SmartEditor
            initialValue={formData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>
      <div>
        <label htmlFor="tags">Add Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions?.filter((tag) => formData.tags?.includes(tag.value))}
          onChange={handleTagSelect}
        />
      </div>
      {formErrors.length > 0 && (
        <div>
          {formErrors.map((error, index) => (
            <span key={index} style={styles.error}>
              {error}
            </span>
          ))}
        </div>
      )}
      <div>
        <CustomButton onClick={handleSaveCategory}>
          {initialFormData?.uniqueId ? "Update Changes" : "Save Changes"}
        </CustomButton>
        <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>

        <JSONDataViewer
          metadata={{
            formData,
            initialFormData,            
            // createCategoryResponse,
            // updateCategoryResponse,
          }}
          title="All collated Responses"
        />
      </div>
    </div>
  );
};

const styles = {
  formStyle: {
    // your form styles here
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
  labelStyle: {
    width: "9%",
    fontWeight: "bold",
  },
  inputStyle: {
    width: "90%",
  },
  fieldRow: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  smartEditorContainer: {
    border: "1px solid #ddd",
    padding: "5px",
    margin: "5px",
  },
};

export default QuestionForm;
