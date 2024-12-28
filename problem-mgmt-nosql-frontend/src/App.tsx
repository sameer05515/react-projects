import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProblemsList from "./components/problems/ProblemsList";
import ProblemDetail from "./components/problems/ProblemDetail";
// import ModalsManager from "./common/manager/ModalsManager";
// import { getProblems } from "./components/api";
// import useModal from "./common/hooks/useModal";

const App: React.FC = () => {
  // const [, setProblems] = useState<any[]>([]);
  // const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);

  // const upsertProblemModal = useModal<string>();
  // const upsertDescriptionModal = useModal<string>();
  // const upsertSolutionModal = useModal<string>();

  // useEffect(() => {
  //   const fetchProblems = async () => {
  //     const data = await getProblems();
  //     setProblems(data);
  //   };
  //   fetchProblems();
  // }, []);

  // const handleProblemSuccess = () => {
  //   upsertProblemModal.closeModal();
  //   setSelectedProblemId(upsertProblemModal.data || "");
  // };

  // const handleDescriptionSuccess = () => {
  //   upsertDescriptionModal.closeModal();
  //   setSelectedProblemId(upsertDescriptionModal.data || "");
  // };

  // const handleSolutionSuccess = () => {
  //   upsertSolutionModal.closeModal();
  //   setSelectedProblemId(upsertSolutionModal.data || "");
  // };

  return (
    <Router>
      <div>
        <h1>Problem Management</h1>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/problems">Problems List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Welcome to the Problem Management System</h2>
                
              </>
            }
          />
          <Route
            path="/problems"
            element={
              <>
                <ProblemsList />
                {/* {selectedProblemId && <ProblemDetail />} */}
              </>
            }
          />
          <Route
            path="/problem/:id"
            element={<ProblemDetail />}
          />
        </Routes>

        {/* <ModalsManager
          problemId={upsertProblemModal.data}
          upsertProblemModal={{
            isOpen: upsertProblemModal.isOpen,
            onClose: upsertProblemModal.closeModal,
            onSuccess: handleProblemSuccess,
          }}
          upsertDescriptionModal={{
            isOpen: upsertDescriptionModal.isOpen,
            onClose: upsertDescriptionModal.closeModal,
            onSuccess: handleDescriptionSuccess,
          }}
          upsertSolutionModal={{
            isOpen: upsertSolutionModal.isOpen,
            onClose: upsertSolutionModal.closeModal,
            onSuccess: handleSolutionSuccess,
          }}
        /> */}
      </div>
    </Router>
  );
};

export default App;
