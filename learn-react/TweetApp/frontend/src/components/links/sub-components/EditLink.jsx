import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import { apiRequest } from "../../../common/service/apiClient/v1";
import { BACKEND_APPLICATION_BASE_URL } from "../../../common/constants/globalConstants";
import { updateLink } from "../../../redux/slices/linksSlice";

const INITIAL_FORM = {
  name: "",
  parentId: "",
  linkType: "EXTERNAL-WEB",
  linkUrl: "",
  description: "",
  descriptions: [{ content: "", textOutputType: "", textInputType: "" }],
};

// -----------------------------------------------------------------------------
// Edit link form (load by id, then save)
// -----------------------------------------------------------------------------
const EditLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [smartEditorError, setSmartEditorError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFormErrors([]);
    apiRequest({ method: "get", url: `${BACKEND_APPLICATION_BASE_URL}/links/${id}` })
      .then((res) => setFormData(res.data))
      .catch(() => setFormErrors(["Failed to load link"]))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push("Name is required");
    if (smartEditorError) errors.push(smartEditorError);
    if (!formData.linkUrl.trim()) errors.push("Link URL is required");
    if (!formData.linkType.trim()) errors.push("Link type is required");
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateLink(formData));
      navigate(-1);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-shadow duration-150";
  const labelClass = "block font-semibold text-gray-700 mb-1.5 text-sm";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[12rem] rounded-lg border border-gray-200 bg-gray-50/50">
        <span className="text-sm font-medium text-gray-500">Loading…</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Link</h2>

      {formErrors.length > 0 && (
        <ul
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm list-disc list-inside space-y-1"
          role="alert"
        >
          {formErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="edit-link-name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            id="edit-link-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="edit-link-url" className={labelClass}>
            Link URL
          </label>
          <input
            type="text"
            id="edit-link-url"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            className={inputClass}
            placeholder="https://…"
            required
          />
        </div>

        <div>
          <label htmlFor="edit-link-description" className={labelClass}>
            Description
          </label>
          <div className="rounded-lg border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:border-transparent">
            <SmartEditor
              preview={false}
              initialValue={formData.descriptions[0]}
              onChange={(c) => setFormData((prev) => ({ ...prev, descriptions: [c] }))}
              onError={setSmartEditorError}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <CustomButton type="submit">Save changes</CustomButton>
          <CustomButton type="button" onClick={() => navigate(-1)}>
            Cancel
          </CustomButton>
        </div>
      </form>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <JSONDataViewer metadata={{ formData }} title="Form state" />
      </div>
    </div>
  );
};

export default EditLink;
