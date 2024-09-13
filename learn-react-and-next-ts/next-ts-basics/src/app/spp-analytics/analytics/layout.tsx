import React from "react";

export default function RootLayout({
  // children,
  interviews,
  tasks,
  topics,
}: {
  // children: React.ReactNode;
  interviews: React.ReactNode;
  tasks: React.ReactNode;
  topics: React.ReactNode;
}) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{tasks?tasks:'tasks ka boject null hai!'}</section>
      <section id="archive-latest">{topics?topics:'topics ka boject null hai!'}</section>
      <section id="archive-interview-mgmt">{interviews?interviews:'interviews ka boject null hai!'}</section>
      interview ka data nhi aa raha
    </div>
  );
}

const Old = ({
  children,
  //   interviewMgmt,
  //   memoryMaps,
  tasks,
  topics,
}: {
  children: React.ReactNode;
  //   interviewMgmt: React.ReactNode;
  //   memoryMaps: React.ReactNode;
  tasks: React.ReactNode;
  topics: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body>
        <div>
          <header>
            <h1>My Application Layout</h1>
          </header>

          <div style={{ display: "flex", gap: "20px" }}>
            {/* Sidebar or main navigation can go here */}
            <nav>
              <ul>
                {/* <li>Interview Management</li>
                <li>Memory Maps</li> */}
                <li>Tasks</li>
                <li>Topics</li>
              </ul>
            </nav>

            {/* Parallel routes content */}
            <main style={{ flex: 1 }}>
              <div>
                {/* <section>{interviewMgmt}</section>
            <section>{memoryMaps}</section> */}
                <section>{tasks}</section>
                <section>{topics}</section>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};
