import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { PostProps } from "../post/Post";
import Form from "@/components/common/custom-form/CustomFormV4";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import Input from "@/components/common/custom-input/CustomInputV3";

type NewPostProps = { onSubmit: (formData: PostProps) => void };

const NewPost = (props: NewPostProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const validate = (data: PostProps) => {
    if (data && data.author?.trim() && data.body?.trim()) {
      return true;
    }
    return false;
  };

  const handleSubmit = (data: PostProps) => {
    if (validate(data)) {
      console.log("Valid", JSON.stringify(data));
      props.onSubmit(data);
    } else {
      console.log("In-Valid", JSON.stringify(data));
    }
  };

  return (
    <Form onSave={handleSubmit} className={postModuleForm}>
      <TexArea id="new-post-body" label="Text" name="body" />
      <Input id="new-post-name" label="Name" name="author" />
      <div className={postModuleFormActions}>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default NewPost;
