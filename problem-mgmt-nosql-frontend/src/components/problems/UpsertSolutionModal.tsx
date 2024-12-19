import React, { useState } from "react";
import ModalComponent from "../../common/components/form/ModalComponent";
import withModal from "../../common/components/hoc/modal/withModal";
import { upsertSolution } from "../problemApi";
import styles from "./UpsertSolutionModal.module.css";

interface UpsertSolutionFormProps {
  onClose: () => void;
  onSuccess: () => void;
  problemId: string;
  solutionId?: string;
  initialSolution?: string;
}

const UpsertSolutionForm: React.FC<UpsertSolutionFormProps> = ({
  onClose,
  onSuccess,
  problemId,
  solutionId: id = "",
  initialSolution = "",
}) => {
  const [solutionDetail, setSolutionDetail] = useState(initialSolution);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const { isError, message } = await upsertSolution(problemId, { solutionDetail, id });
    if (isError) {
      setError(message);
    } else {
      onSuccess();
      onClose();
    }
  };

  return (
    <ModalComponent
      title={id ? "Update Solution" : "Create Solution"}
      errorMessage={error}
      submitButtonLabel="Submit"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
        <label>
          Solution Detail:
          <textarea
            className={styles.textarea}
            value={solutionDetail}
            onChange={(e) => setSolutionDetail(e.target.value)}
            placeholder="Add a new Solution"
          />
        </label>
    </ModalComponent>
  );
};

export { UpsertSolutionForm };
const UpsertSolutionModal = withModal(UpsertSolutionForm);

export default UpsertSolutionModal;
