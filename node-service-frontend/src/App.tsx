// import APICreatorForm from "./components/api-testing/APIClientTester";
// import APIResponseApiClientTester from "./components/api-testing/APIResponseApiClientTester";
// import APIResponseAxiosTester from "./components/api-testing/APIResponseAxiosTester";
// import APIResponseTester from "./components/api-testing/APIResponseFetchTester";
import APIClientTestingDashboard from "./components/api-testing/Dashboard";
import NodeDashboard from "./components/NodeDashboard";

function App() {
  return (
    <>
      <NodeDashboard />
      <hr />
      <APIClientTestingDashboard/>
    </>
  );
}

export default App;
