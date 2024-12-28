import React, { useState } from "react";
import ModalComponent from "../../common/components/form/ModalComponent";
import withModal from "../../common/components/hoc/modal/withModal";
import { upsertDescription } from "../problemApi";
import styles from "./UpsertDescriptionModal.module.css";

interface UpsertDescriptionFormProps {
  onClose: () => void;
  onSuccess: () => void;
  problemId: string;
  descriptionId?: string;
  initialDescription?: string;
}

const UpsertDescriptionForm: React.FC<UpsertDescriptionFormProps> = ({
  onClose,
  onSuccess,
  problemId,
  descriptionId: id = "",
  initialDescription = "",
}) => {
  const [detail, setDetail] = useState(initialDescription);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const { isError, message } = await upsertDescription(problemId, {
      detail,
      id,
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
      title={id ? "Update Description" : "Create Description"}
      errorMessage={error}
      submitButtonLabel="Submit"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
        <label>
          Detail:
          <textarea
            className={styles.textarea}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Add a new description"
          />
        </label>
    </ModalComponent>
  );
};

export { UpsertDescriptionForm };
const UpsertDescriptionModal = withModal(UpsertDescriptionForm);

export default UpsertDescriptionModal;
