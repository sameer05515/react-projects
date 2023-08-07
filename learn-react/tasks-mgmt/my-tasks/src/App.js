import "./App.css";
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
    </div>
  );
}

export default App;
