import React from "react";
import UpsertProblemModal from "../../components/problems/UpsertProblemModal";
import UpsertDescriptionModal from "../../components/problems/UpsertDescriptionModal";
import UpsertSolutionModal from "../../components/problems/UpsertSolutionModal";

interface ModalsManagerProps {
  problemId: string | null;
  upsertProblemModal: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  };
  upsertDescriptionModal: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  };
  upsertSolutionModal: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  };
}

const ModalsManager: React.FC<ModalsManagerProps> = ({
  problemId,
  upsertProblemModal,
  upsertDescriptionModal,
  upsertSolutionModal,
}) => {
  return (
    <>
      {upsertProblemModal.isOpen && problemId && (
        <UpsertProblemModal
          problemId={problemId}
          onClose={upsertProblemModal.onClose}
          onSuccess={upsertProblemModal.onSuccess}
          isOpen={false}
        />
      )}

      {upsertDescriptionModal.isOpen && (
        <UpsertDescriptionModal
          problemId={problemId || ""}
          onClose={upsertDescriptionModal.onClose}
          onSuccess={upsertDescriptionModal.onSuccess}
          isOpen={false}
        />
      )}

      {upsertSolutionModal.isOpen && (
        <UpsertSolutionModal
          problemId={problemId || ""}
          onClose={upsertSolutionModal.onClose}
          onSuccess={upsertSolutionModal.onSuccess}
          isOpen={false}
        />
      )}
    </>
  );
};

export default ModalsManager;
