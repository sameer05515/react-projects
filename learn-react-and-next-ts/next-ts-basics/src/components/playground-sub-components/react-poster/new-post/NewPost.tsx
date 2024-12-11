import React, { useState } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import JSONDataViewer from "@/components/common/JSONDataViewer";

const NewPost = () => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const [formData, setFormData] = useState({ name: "", body: "" });

  const handleFormChange = (fieldData: { name: string; value: string }) => {
    if (!fieldData) {
      return;
    }
    setFormData((prev) => ({ ...prev, [fieldData.name]: fieldData.value }));
  };
  return (
    <form className={postModuleForm}>
      <p>
        <label htmlFor="new-post-body">Text</label>
        <textarea
          id="new-post-body"
          name="body"
          required
          rows={5}
          onChange={(e) => {
            const { name, value } = e.target;
            handleFormChange({ name, value });
          }}
        />
      </p>
      <p>
        <label htmlFor="new-post-name">Name</label>
        <input
          id="new-post-name"
          name="name"
          type="text"
          required
          onChange={(e) => {
            const { name, value } = e.target;
            handleFormChange({ name, value });
          }}
        />
      </p>

      <JSONDataViewer metadata={{ formData }} title="data" />

      <div className={postModuleFormActions}>
        <button>Save</button>
      </div>
    </form>
  );
};

export default NewPost;
