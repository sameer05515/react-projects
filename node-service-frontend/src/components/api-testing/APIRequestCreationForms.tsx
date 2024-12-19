import { FormEvent, useState } from "react";
import { responseAccToStatusCodeUrl } from "../../common/constants/Global";

// Type definitions
type APISubmitResponseProps = { method: string; url: string };

interface APICreatorFormProps {
  onSubmit: (data: APISubmitResponseProps) => void;
}

type APICreatorFormV2Props = {
  httpStatusOptions: string[];
  defaultUrl?: string;
} & APICreatorFormProps;

// Reusable submit handler
const handleFormSubmit = (
  e: FormEvent<HTMLFormElement>,
  defaultValues: Partial<{ method: string; base: string; url: string }>,
  onSubmit: (data: APISubmitResponseProps) => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const method = defaultValues.method || (formData.get("method") as string);
  const base = defaultValues.base || formData.get("base") || "";
  const url = `${base}${formData.get("url") || ""}`;

  onSubmit({ method, url });
};

const getFirstPart = (input: string): string => input.split(" ")[0];

// APICreatorFormV1 Component
const APICreatorFormV1 = ({ onSubmit }: APICreatorFormProps) => {
  const options = ["get", "put", "post", "delete", "patch"];

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e, { method: "get" }, onSubmit)}
    >
      <label>
        Method:
        <select name="method" required>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Base URL:
        <input
          type="text"
          name="base"
          placeholder="Enter Base URL"
          required
        />
      </label>
      <br />
      <label>
        Resource URL:
        <input
          type="text"
          name="url"
          placeholder="Enter Resource URL"
          required
        />
      </label>
      <br />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

// APICreatorFormV2 Component
const APICreatorFormV2 = ({
  httpStatusOptions,
  defaultUrl = responseAccToStatusCodeUrl,
  onSubmit,
}: APICreatorFormV2Props) => {
  return (
    <form
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          { method: "get", base: defaultUrl },
          ({ method, url }) => {
            const httpStatusCode = e.currentTarget.httpStatusCode.value;
            onSubmit({ method, url: `${url}${getFirstPart(httpStatusCode)}` });
          }
        )
      }
    >
      <label>
        HTTP Status:
        <select name="httpStatusCode" required>
          {httpStatusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

// APICreatorForm Component
const APICreatorForm = ({
  httpStatusOptions,
  onSubmit,
}: APICreatorFormV2Props) => {
  const [showFormV1, setShowFormV1] = useState(true);

  const toggleForm = () => setShowFormV1((prev) => !prev);

  return (
    <div>
      <button onClick={toggleForm}>Swap Forms</button>
      <br />
      {showFormV1 ? (
        <APICreatorFormV1 onSubmit={onSubmit} />
      ) : (
        <APICreatorFormV2
          httpStatusOptions={httpStatusOptions}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default APICreatorForm;
export { type APISubmitResponseProps };
