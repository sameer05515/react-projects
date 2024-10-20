import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import CustomButton from "@/components/common/custom-button/CustomButtonV1_0_0";
import Form, {
  type CustomFormV6Handle,
} from "@/components/common/custom-form/CustomFormV4.2";
import FormError from "@/components/common/custom-form/form-errors-display/FormErrorV3";
import TexArea from "@/components/common/custom-text-area/CustomTexArea";
import yaml from "js-yaml";
import { useRef, useState } from "react";
import { ComparisonDataType } from "../common/data/data_v1_0_2";
import SPPTableV1_0_3 from "../sub-components/comparison-component/SPPTableV1_0_3";
import { accenture_JavaUpskillingTraining_CourseContent } from "../common/data/data_v1_0_3";

// Define the response type with generics
interface LoadYAMLResponse<T> {
  jsonData: T | null;
  isError: boolean;
  errorMessage: string | null;
}

const loadYAMLData = <T,>(yamlText: string): LoadYAMLResponse<T> => {
  try {
    const jsonData = yaml.load(yamlText) as T;
    console.log(jsonData);
    return {
      jsonData,
      isError: false,
      errorMessage: null,
    };
  } catch (e: any) {
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

// Additional validation for YAML structure
const validateYAMLStructure = (
  data: any
): data is ComparisonDataType<string> => {
  if (
    typeof data.uniqueId !== "string" ||
    typeof data.title !== "string" ||
    !Array.isArray(data.headers) ||
    !Array.isArray(data.rowData)
  ) {
    return false;
  }
  return data.rowData.every(
    (row: any) => typeof row.aspect === "string" && Array.isArray(row.values)
  );
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

  const validate = (data: FormResponseProps): { valid: boolean } => {
    const errors: string[] = [];
    const trimmedYAMLText = data.yamlText?.trim();

    if (!trimmedYAMLText) {
      errors.push("Please provide a valid YAML text.");
    } else {
      const { errorMessage, isError, jsonData } =
        loadYAMLData<ComparisonDataType<string>>(trimmedYAMLText);
      if (isError) {
        errors.push(
          errorMessage || "Error occurred while parsing the YAML text."
        );
      } else if (!validateYAMLStructure(jsonData)) {
        errors.push(
          "The YAML structure is not valid for comparison data." +
            "\n" +
            JSON.stringify(jsonData, null, 2)
        );
      }
    }

    setFormErrors(errors);
    return { valid: errors.length === 0 };
  };

  const handleSubmit = (rawdata: unknown) => {
    const data = rawdata as FormResponseProps;
    const { valid } = validate(data);
    if (valid) {
      console.log("[YAMLProcessorForm]: Valid data:", JSON.stringify(data));
      onSubmit(data);
    } else {
      console.log("[YAMLProcessorForm]: Invalid data:", JSON.stringify(data));
    }
  };

  const handleCancel = () => {
    customFormRef.current?.clear();
    setFormErrors([]);
    onReset();
  };

  return (
    <Form
      onSave={handleSubmit}
      className={postModuleForm}
      style={{ width: "90%" }}
      ref={customFormRef}
    >
      <TexArea id="new-post-body" label="Text" name="yamlText" />
      <div className={postModuleFormActions}>
        <CustomButton type="submit">Apply</CustomButton>
        <CustomButton type="button" onClick={handleCancel}>
          Reset
        </CustomButton>
      </div>

      <FormError formErrors={formErrors} />
    </Form>
  );
};

// Main Dashboard Component
const SPPTableDashboardV1_0_4 = () => {
  const [data, setData] = useState<ComparisonDataType<
    string | string[]
  > | null>(accenture_JavaUpskillingTraining_CourseContent);

  const handleFormSubmit = (formData: FormResponseProps) => {
    const parsedData = loadYAMLData<ComparisonDataType<string>>(
      formData.yamlText
    );
    if (!parsedData.isError && validateYAMLStructure(parsedData.jsonData)) {
      setData(parsedData.jsonData);
    }
  };

  const renderCellValue = (cellValue: string | string[]) => (
    <>
      {typeof cellValue === "string" ? (
        <b>{cellValue}</b>
      ) : (
        cellValue.map((cv, idx) => (
          <span key={`id_${idx + 1}`}>
            <b>{cv}</b>
            <hr />
          </span>
        ))
      )}
    </>
  );

  return (
    <div>
      <YAMLProcessorForm
        onSubmit={handleFormSubmit}
        onReset={() => setData(null)}
      />
      {data && (
        <SPPTableV1_0_3
          data={data}
          renderCell={renderCellValue}
          rowValueValidator={(rv) =>
            typeof rv === "string" ||
            (Array.isArray(rv) &&
              rv.every((rvVal) => typeof rvVal === "string"))
          }
        />
      )}
    </div>
  );
};

export default SPPTableDashboardV1_0_4;
