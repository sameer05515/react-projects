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
  jsonData: unknown;
  isError: boolean;
  errorMessage: string | null;
}

const loadYAMLData = (yamlText: string): LoadYAMLResponse => {
  try {
    const jsonData = yaml.load(yamlText);
    console.log(jsonData);

    return {
      jsonData,
      isError: false,
      errorMessage: null,
    };
  } catch (e: any) {
    // Catch all types of errors from js-yaml and return a structured error message
    console.error(e);
    const error = e.mark
      ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}`
      : `Error parsing YAML: ${e.message}`;

    return {
      jsonData: null,
      isError: true,
      errorMessage: error,
    };
  }
};

export type FormResponseProps = {
  yamlText: string;
};

type YAMLProcessorFormProps = {
  onSubmit: (formData: FormResponseProps) => void;
  onReset: () => void;
};

const YAMLProcessorForm = ({ onSubmit, onReset }: YAMLProcessorFormProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "post-module-form": postModuleForm,
      "post-module-form-actions": postModuleFormActions,
    },
  } = useGlobalStyles();

  const customFormRef = useRef<CustomFormV6Handle>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const validate = (data: FormResponseProps): {valid:boolean} => {
    const errors: string[] = [];
    const trimmedYAMLText = data.yamlText?.trim();

    if (!trimmedYAMLText) {
      errors.push("Please provide a valid yamlText");
    } else {
      const { errorMessage, isError, jsonData } = loadYAMLData(trimmedYAMLText);
      if (isError) {
        errors.push(errorMessage || "Error occurred while parsing given YAML text");
      }
    }

    setFormErrors(errors);
    return {valid:errors.length === 0};
  };

  const handleSubmit = (rawdata: unknown) => {
    const data = rawdata as FormResponseProps;
    const {valid}=validate(data);
    if (valid) {
      console.log("[NewPostWithCustomFormV3]: Valid: ", JSON.stringify(data));
      onSubmit(data);
    } else {
      console.log("[NewPostWithCustomFormV3]: Invalid: ", JSON.stringify(data));
    }
  };

  const handleCancel = () => {
    customFormRef.current?.clear();
    setFormErrors([]);
    onReset();
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

// Main Dashboard Component
const SPPTableDashboardV1_0_3 = () => {
  const [data, setData] = useState<ComparisonDataType<string> | null>(null);

  const handleFormSubmit = (formData: FormResponseProps) => {
    const parsedData = loadYAMLData(formData.yamlText);
    if (!parsedData.isError) {
      setData(parsedData.jsonData as ComparisonDataType<string>);
    }
  };

  return (
    <div>
      <YAMLProcessorForm onSubmit={handleFormSubmit} onReset={() => setData(null)} />
      {data && <SPPTableV1_0_2 data={data} />}
    </div>
  );
};

export default SPPTableDashboardV1_0_3;
