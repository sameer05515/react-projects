import React, { useState } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { PostProps } from "../post/Post";

type NewPostProps = { onSubmit: (formData: PostProps) => void };

const NewPost = (props: NewPostProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const [formData, setFormData] = useState<PostProps>({ author: "", body: "" });

  const handleFormChange = (fieldData: { name: string; value: string }) => {
    if (!fieldData) {
      return;
    }
    setFormData((prev) => ({ ...prev, [fieldData.name]: fieldData.value }));
  };

  const validate = () => {
    if (formData && formData.author?.trim() && formData.body?.trim()) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (validate()) {
      // console.log('Valid');
      props.onSubmit(formData);
    }else{
      // console.log('In-Valid');
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={postModuleForm}
    >
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
          name="author"
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
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default NewPost;
