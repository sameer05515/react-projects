import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import Form, { type CustomFormV6Handle } from "@/components/common/custom-form/CustomFormV4.2";
import FormError, { FormErrorElement } from "@/components/common/custom-form/form-errors-display/FormErrorV2";
import Input from "@/components/common/custom-input/CustomInputV3";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from "react";
import { PostProps } from "../post/Post";

export type FormErrorsHandle = {
  addApiResponseMessages: (messages: string[]) => void;
};

type NewPostProps = {
  onSubmit: (formData: PostProps) => void;
};

const NewPost = forwardRef<FormErrorsHandle, NewPostProps>(({ onSubmit }: NewPostProps, ref: React.Ref<FormErrorsHandle>) => {
  const {
    GLOBAL_APPLICATION_STYLES: { "post-module-form": postModuleForm, "post-module-form-actions": postModuleFormActions },
  } = useGlobalStyles();

  const customFormRef = useRef<CustomFormV6Handle>(null);
  const [formErrors, setFormErrors] = useState<FormErrorElement[]>([]);

  useImperativeHandle(ref, () => ({
    addApiResponseMessages: (messages: string[]) => {
      setFormErrors((prev) =>
        prev.concat(
          messages.map((m) => ({
            errorType: "API Response Error",
            message: m,
          }))
        )
      );
    },
  }));

  const validate = useCallback((data: PostProps) => {
    const errors: FormErrorElement[] = [];
    if (!data?.author?.trim()) {
      errors.push({
        errorType: "Form Validation",
        message: "Please provide a valid name",
      });
    }
    if (!data?.body?.trim()) {
      errors.push({
        errorType: "Form Validation",
        message: "Please provide valid text",
      });
    }
    setFormErrors(errors);
    return errors.length === 0;
  }, []);

  const handleSubmit = useCallback((rawdata: unknown) => {
    const data = rawdata as PostProps;
    if (validate(data)) {
      console.log("[NewPostWithCustomFormV3]: Valid: ", JSON.stringify(data));
      onSubmit(data);
    } else {
      console.log(
        "[NewPostWithCustomFormV3]: In-Valid: ",
        JSON.stringify(data)
      );
    }
  }, [onSubmit, validate]);

  const handleReset = useCallback(() => {
    customFormRef.current?.clear();
    setFormErrors([]);
  }, []);

  return (
    <Form onSave={handleSubmit} className={postModuleForm} ref={customFormRef}>
      <TexArea id="new-post-body" label="Text" name="body" />
      <Input id="new-post-name" label="Name" name="author" />
      <FormError formErrors={formErrors} />
      <div className={postModuleFormActions}>
        <button type="submit">Save</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </Form>
  );
});

export default NewPost;
