import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddReflection from "./pages/AddReflection";
import ReflectionList from "./pages/ReflectionList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/add" replace />} />

        <Route path="/add" element={<AddReflection />} />

        <Route path="/reflections" element={<ReflectionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;