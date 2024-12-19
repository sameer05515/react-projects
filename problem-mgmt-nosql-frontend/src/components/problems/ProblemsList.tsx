import React, { useCallback, useEffect, useState } from "react";
import useModal from "../../common/hooks/useModal";
import useNavigation from "../../common/hooks/useNavigation";
import { getProblems } from "../problemApi";
import styles from "./ProblemList.module.css"; // Import the CSS module
import UpsertProblemModal from "./UpsertProblemModal";

interface Problem {
  id: string;
  title: string;
  status: string;
}

const ProblemsList: React.FC = () => {
  const { goToProblemDetails } = useNavigation();
  const [problems, setProblems] = useState<Problem[]>([]);
  const { closeModal, data, isOpen, openModal } = useModal<Problem>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state

  // Fetch problems function
  const fetchProblems = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Reset error state before refetching
    try {
      const { data, isError, message } = await getProblems();
      if (isError) {
        setError(message);
      } else if (data) {
        setProblems(data);
      }
    } catch (err) {
      // setError("An error occurred while fetching problems.");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Failed to fetch problem details."
      );
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  }, []);

  // Fetch problems on component mount
  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // Open or edit problem modal
  const openUpsertProblemModal = (problemData?: Problem) => {
    openModal(problemData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Problems</h2>
      <button onClick={() => openUpsertProblemModal()} disabled={loading}>
        Create Problem
      </button>
      <button onClick={() => fetchProblems()} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.problemList}>
        {problems.map((problem) => (
          <li key={problem.id} className={styles.problemItem}>
            <span>
              {problem.status} - {problem.title}
            </span>
            <button
              onClick={() => openUpsertProblemModal(problem)}
              disabled={loading}
            >
              Edit
            </button>
            <button
              onClick={() => goToProblemDetails(problem.id)}
              disabled={loading}
            >
              View
            </button>
          </li>
        ))}
      </ul>
      {isOpen && (
        <UpsertProblemModal
          onClose={closeModal}
          onSuccess={() => {
            fetchProblems(); // Refetch problems after modal success
          }}
          isOpen={isOpen}
          problemId={data?.id}
          initialStatus={data?.status}
          initialTitle={data?.title}
        />
      )}
    </div>
  );
};

export default ProblemsList;
