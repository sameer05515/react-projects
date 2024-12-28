import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProblemDetail.module.css"; // Import the CSS module
import useModal from "../../common/hooks/useModal";
import UpsertDescriptionModal from "./UpsertDescriptionModal";
import UpsertSolutionModal from "./UpsertSolutionModal";
import { getProblemById } from "../problemApi";

interface Description {
  id: string;
  detail: string;
}

interface Solution {
  id: string;
  solutionDetail: string;
}

interface Problem {
  id: string;
  title: string;
  status: string;
  descriptions: Description[];
  solutions: Solution[];
}

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [problem, setProblem] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const descriptionModal = useModal<Description>();
  const solutionModal = useModal<Solution>();

  const fetchProblem = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await getProblemById(id);
      if (response.isError) {
        setError(response.message || "An error occurred.");
        setProblem(null);
      } else if (response.data) {
        setProblem(response.data);
        setError(null); // Clear any previous errors
      } else {
        setProblem(null); // Explicitly set null if data is undefined
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Failed to fetch problem details."
      );
      setProblem(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProblem();
  }, [id, fetchProblem]);

  if (!id) {
    return <div className={styles.loading}>Invalid ID: '{id}'</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!problem) {
    return (
      <div className={styles.loading}>
        Problem not found or unable to load details.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{problem.title}</h2>
      <button onClick={fetchProblem} disabled={loading}>
        Refresh
      </button>
      <p className={styles.status}>Status: {problem.status}</p>

      {error && <p className={styles.error}>{error}</p>}

      {/* Descriptions Section */}
      <h3 className={styles.subheading}>Descriptions</h3>
      <button onClick={() => descriptionModal.openModal()}>
        Add New Description
      </button>
      <ul className={styles.list}>
        {problem.descriptions.map((desc) => (
          <li key={desc.id} className={styles.listItem}>
            <p className={styles.itemText}>{desc.detail}</p>
            <button
              onClick={() =>
                descriptionModal.openModal({ detail: desc.detail, id: desc.id })
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Solutions Section */}
      <h3 className={styles.subheading}>Solutions</h3>
      <button onClick={() => solutionModal.openModal()}>
        Add New Solution
      </button>
      <ul className={styles.list}>
        {problem.solutions.map((solution) => (
          <li key={solution.id} className={styles.listItem}>
            <p className={styles.itemText}>{solution.solutionDetail}</p>
            <button
              onClick={() =>
                solutionModal.openModal({
                  solutionDetail: solution.solutionDetail,
                  id: solution.id,
                })
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Description Modal */}
      {descriptionModal.isOpen && (
        <UpsertDescriptionModal
          onClose={descriptionModal.closeModal}
          onSuccess={() => {
            // Optionally refetch or update state
            console.log("Description updated.");
            fetchProblem();
          }}
          problemId={id}
          isOpen={descriptionModal.isOpen}
          descriptionId={descriptionModal.data?.id}
          initialDescription={descriptionModal.data?.detail || ""}
        />
      )}

      {/* Solution Modal */}
      {solutionModal.isOpen && (
        <UpsertSolutionModal
          onClose={solutionModal.closeModal}
          onSuccess={() => {
            // Optionally refetch or update state
            console.log("Solution updated.");
            fetchProblem();
          }}
          problemId={id}
          isOpen={solutionModal.isOpen}
          initialSolution={solutionModal.data?.solutionDetail || ""}
          solutionId={solutionModal.data?.id}
        />
      )}
    </div>
  );
};

export default ProblemDetail;
