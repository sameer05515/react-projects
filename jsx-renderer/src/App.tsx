// import JSXRendererV1 from "./JSXRenderer/v1";

// function App() {
//   return (
//     <>
//       <JSXRendererV1 />
//     </>
//   );
// }

import { Route, Routes, Link } from "react-router-dom";
import TestingDashboard from "./ApnaPlayground";
// import Home from "../pages/Home";
// import About from "../pages/AboutThisProject";
import NotFound from "./NotFound/v1";
import { Outlet } from "react-router-dom";

function Layout(/**{ children }: { children: React.ReactNode }*/) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <Header /> */}

        {/* Main Section */}
        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

type LinkProps = {
  id: string;
  linkHeader: string;
  linkPath: () => string;
  icon: string;
};
// Links with icons
const prepareLinks = () =>
  [
    { linkHeader: "Home", linkPath: () => "/", icon: "FaHome" },
    // { linkHeader: "Targetted Questions", linkPath: () => "/targetted-questions", icon: "FaBullseye" },
    {
      linkHeader: "Apna Playground",
      linkPath: () => "/testing",
      icon: "FaBasketballBall",
    },
    { linkHeader: "About", linkPath: () => "/about", icon: "FaFileAlt" },
    // { linkHeader: "Resume Management", linkPath: () => "/resume", icon: "FaFileAlt" },
    // { linkHeader: "CGPT Dashboard V1", linkPath: () => "/cgpt/v1", icon: "FaChartPie" },
    // { linkHeader: "PragyamDashboard V2", linkPath: () => "/cgpt/v2", icon: "TbInfinity" },
    // { linkHeader: "Settings", linkPath: () => "/settings", icon: "FaCog" },
    // { linkHeader: "Testing", linkPath: () => "/testing", icon: "MdOutlineAssessment" },
  ].map((link, idx) => ({ ...link, id: `link_${idx}` }));

const AvailableLinks: LinkProps[] = prepareLinks();

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome</h1>
      <nav className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
        <ul className="space-y-2">
          {AvailableLinks.map((link) => (
            <li key={link.id} className="text-center">
              <Link
                to={link.linkPath()}
                className="block px-4 py-2 text-lg font-medium text-blue-600 hover:bg-blue-100 rounded-md transition"
              >
                {link.linkHeader}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const AboutThisProject = () => <>AboutThisProject</>;

function App() {
  return (
    <Routes>
      {/**Test route- for arbitrary testing from scratch*/}
      <Route path="/testing" element={<TestingDashboard />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutThisProject />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
