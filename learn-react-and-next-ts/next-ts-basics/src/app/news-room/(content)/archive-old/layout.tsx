import React, { type ReactNode } from "react";

// Define the types for the props
interface ArchiveLayoutProps {
  children: ReactNode;
  archive: ReactNode;
  latest: ReactNode;
}

const ArchiveLayout: React.FC<ArchiveLayoutProps> = ({ archive, latest }) => {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
};

export default ArchiveLayout;
