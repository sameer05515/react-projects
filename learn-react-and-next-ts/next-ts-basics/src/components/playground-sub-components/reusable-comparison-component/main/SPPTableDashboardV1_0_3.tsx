import CustomButton from "@/components/common/custom-button/CustomButtonV1_0_0";
import { useRef, useState } from "react";
import { comparisonData } from "../common/data/data_v1_0_2";
import SPPTableV1_0_2 from "../sub-components/comparison-component/SPPTableV1_0_2";
import Form, {
  type CustomFormV6Handle,
} from "@/components/common/custom-form/CustomFormV4.2";
import FormError from "@/components/common/custom-form/form-errors-display/FormError";
import Input from "@/components/common/custom-input/CustomInputV3";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

export type PostProps = {
  yamlText: string;
};

type NewPostProps = {
  onSubmit: (formData: PostProps) => void;
  onReset: () => void;
};

const NewPost = (props: NewPostProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const customFormRef = useRef<CustomFormV6Handle>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const validate = (data: PostProps) => {
    const errors: string[] = [];
    if (!data?.yamlText?.trim()) errors.push("Please provide a valid yamlText");

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (rawdata: unknown) => {
    const data = rawdata as PostProps;
    if (validate(data)) {
      console.log("[NewPostWithCustomFormV3]: Valid: ", JSON.stringify(data));
      props.onSubmit(data);
    } else {
      console.log(
        "[NewPostWithCustomFormV3]: In-Valid: ",
        JSON.stringify(data)
      );
    }
  };

  const handleCancel = () => {
    customFormRef.current?.clear();
    setFormErrors([]);
    props.onReset();
  };

  return (
    <Form onSave={handleSubmit} className={postModuleForm} ref={customFormRef}>
      <TexArea id="new-post-body" label="Text" name="yamlText" />
      <FormError formErrors={formErrors} />
      <div className={postModuleFormActions}>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Reset
        </button>
      </div>
    </Form>
  );
};

// Usage example
const SPPTableDashboardV1_0_3 = () => {
  const [currIndex, setCurrIndex] = useState(0);
  return (
    <>
      <div>
        <CustomButton
          onClick={() =>
            setCurrIndex((prev) => (prev + 1) % comparisonData.length)
          }
        >
          Next
        </CustomButton>

        <NewPost onSubmit={()=>{}} onReset={()=>{}}/>

        <SPPTableV1_0_2 data={comparisonData[currIndex]} />
      </div>
    </>
  );
};

export default SPPTableDashboardV1_0_3;
