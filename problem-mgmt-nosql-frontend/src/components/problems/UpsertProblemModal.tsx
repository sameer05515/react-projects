import React, { useState } from "react";
import ModalComponent from "../../common/components/form/ModalComponent";
import { upsertProblem } from "../problemApi";
// Import the reusable ModalComponent
import FormElement from "../../common/components/form/element/FormElement";
import withModal from "../../common/components/hoc/modal/withModal";
import styles from "./UpsertProblemModal.module.css";
import ProblemStatusList from "../../common/constants/ProblemStatus";
import { transformString } from "../../common/utils/StringUtils";

interface UpsertProblemModalProps {
  onClose: () => void;
  onSuccess: () => void;
  problemId?: string;
  initialTitle?: string;
  initialStatus?: string;
}

const UpsertProblemForm: React.FC<UpsertProblemModalProps> = ({
  onClose,
  onSuccess,
  problemId,
  initialTitle = "",
  initialStatus = "OPEN",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const { isError, message } = await upsertProblem({
      id: problemId || "",
      title,
      status,
    });

    if (isError) {
      setError(message);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <ModalComponent
      title={problemId ? "Update Problem" : "Create Problem"}
      errorMessage={error}
      submitButtonLabel="Submit"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <FormElement
        as="input"
        feTitle="Title"
        className={styles.input}
        value={title}
        onFeChange={(value) => setTitle(value)}
      />

      <FormElement
        as="select"
        feTitle="Status"
        className={styles.select}
        value={status}
        onFeChange={(value) => setStatus(value)}
      >
        {/* <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CLOSED">CLOSED</option> */}
        {ProblemStatusList.map((k, idx) => (
          <option key={`status_key_${idx + 1}`} value={k}>
            {transformString(k)}
          </option>
        ))}
      </FormElement>
    </ModalComponent>
  );
};

export { UpsertProblemForm };

const UpsertProblemModal = withModal(UpsertProblemForm);

export default UpsertProblemModal;
