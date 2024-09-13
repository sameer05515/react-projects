import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import Form from "@/components/common/custom-form/CustomFormV4.1";
import FormError from "@/components/common/custom-form/form-errors-display/FormError";
import Input from "@/components/common/custom-input/CustomInputV3";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import { useState } from "react";
import { PostProps } from "../post/Post";

type NewPostProps = { onSubmit: (formData: PostProps) => void };

const NewPost = (props: NewPostProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const validate = (data: PostProps) => {
    const errors: string[] = [];
    if (!data?.author?.trim()) errors.push("Please provide a valid name");
    if (!data?.body?.trim()) errors.push("Please provide valid text");

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (data: PostProps) => {
    if (validate(data)) {
      console.log("[NewPostWithCustomFormV2]: Valid", JSON.stringify(data));
      props.onSubmit(data);
    } else {
      console.log("[NewPostWithCustomFormV2]: In-Valid", JSON.stringify(data));
    }
  };

  return (
    <Form onSave={handleSubmit} className={postModuleForm}>
      <TexArea id="new-post-body" label="Text" name="body" />
      <Input id="new-post-name" label="Name" name="author" />
      <FormError formErrors={formErrors} />
      <div className={postModuleFormActions}>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default NewPost;
