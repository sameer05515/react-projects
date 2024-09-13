import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playground from "./routes/playground/Playground";
import NotFound from "./routes/not-found/NotFound";
import Header from "./routes/header/Header";
import Projects from "./routes/resumes/Projects";
import Companies from "./routes/resumes/Companies";
import TechStacks from "./routes/resumes/TechStacks";
import CompanyDomain from "./routes/resumes/CompanyDomain";
import ArchitecturalStyles from "./routes/resumes/ArchitecturalStyles";
import Test from "./routes/test/Test";
// import ProjectList from "./components/resumes/ProjectList";
// import ProjectCard from "./components/resumes/ProjectCard";
// import CompanyList from "./components/resumes/CompanyList";
// import CompanyCard from "./components/resumes/companyCard";
// import TechStackList from "./components/resumes/TechStackList";
// import TechStackCard from "./components/resumes/TechStackCard";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Playground />} />
          <Route path="/projects" element={<Projects />}>
            {/* <Route index element={<ProjectList />} />
            <Route path=":projectUID" element={<ProjectCard />} /> */}
          </Route>
          <Route path="/companies" element={<Companies />}>
            {/* <Route index element={<CompanyList />} />
            <Route path=":companyUID" element={<CompanyCard />} /> */}
          </Route>
          <Route path="/company-domains" element={<CompanyDomain />}>
            {/* <Route index element={<TechStackList />} />
            <Route path=":techStackUID" element={<TechStackCard />} /> */}
          </Route>
          <Route path="/architectural-styles" element={<ArchitecturalStyles />}>
            {/* <Route index element={<TechStackList />} />
            <Route path=":techStackUID" element={<TechStackCard />} /> */}
          </Route>
          <Route path="/tech-stacks" element={<TechStacks />}>
            {/* <Route index element={<TechStackList />} />
            <Route path=":techStackUID" element={<TechStackCard />} /> */}
          </Route>
          <Route path="/testing" element={<Test/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
