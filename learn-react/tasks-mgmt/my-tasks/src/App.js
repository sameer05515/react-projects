import "./App.css";
// import GitDiff from "./components/GitDiff";
// import GoldRateTable from "./components/GoldRateTable";
import TasksBase from "./components/tasks/TasksBase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />

      <TasksBase />
      {/* <MUIIconTest/> */}
      {/* <FormComponent /> */}
      {/* <UserListComponent/> */}
      {/* <ToastButtonComponent /> */}
      {/* <GoldRateTable/> */}
      {/* <GitDiff oldContent="This is the old content." newContent="This is the new content."/> */}
    </div>
  );
}

export default App;
