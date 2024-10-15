import CustomButton from "@/components/common/custom-button/CustomButtonV1_0_0";
import { useRef, useState } from "react";
import { comparisonData, ComparisonDataType } from "../common/data/data_v1_0_2";
import SPPTableV1_0_2 from "../sub-components/comparison-component/SPPTableV1_0_2";
import Form, {
  type CustomFormV6Handle,
} from "@/components/common/custom-form/CustomFormV4.2";
import FormError from "@/components/common/custom-form/form-errors-display/FormError";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import yaml from "js-yaml";

// Define the response type
interface LoadYAMLResponse {
  jsonData: any;
  isError: boolean;
  errorMessage: string | null;
}

const loadYAMLData = (yamlText: string): LoadYAMLResponse => {
  try {
    const jsonData = yaml.load(yamlText);
    console.log(jsonData);

    return {
      jsonData: jsonData,
      isError: false,
      errorMessage: null,
    };
  } catch (e: any) {
    // Use 'any' since js-yaml can throw different error types
    console.error(e);
    const error = e.mark
      ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}`
      : `Error parsing YAML: ${e.message}`;

    return {
      jsonData: null,
      isError: true, // Set this to true since there was an error
      errorMessage: error,
    };
  }
};

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
    if (!data?.yamlText?.trim()) {
      errors.push("Please provide a valid yamlText");
    } else if (data?.yamlText?.trim()) {
      const { errorMessage, isError } = loadYAMLData(
        data?.yamlText?.trim()
      );
      if (isError) {
        errors.push(
          errorMessage || "Error occured while parsing given YAML text"
        );
      }
    }
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
        <CustomButton type="submit">Save</CustomButton>
        <CustomButton type="button" onClick={handleCancel}>
          Reset
        </CustomButton>
      </div>
    </Form>
  );
};

// Usage example
const SPPTableDashboardV1_0_3 = () => {
  const [data, setData] = useState<ComparisonDataType<string> | null>(null);
  return (
    <div>
      <NewPost onSubmit={() => {}} onReset={() => {}} />
      {data && <SPPTableV1_0_2 data={data} />}
    </div>
  );
};

export default SPPTableDashboardV1_0_3;
